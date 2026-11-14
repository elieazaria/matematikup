
-- =====================================================
-- MATEMATIKUP
-- MIGRATION 003 : EVALUATIONS ET PROGRESSION
-- =====================================================


-- =====================================================
-- 1. TENTATIVES DE QUIZ
-- =====================================================

CREATE TABLE public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    enrollment_id UUID NOT NULL
        REFERENCES public.student_enrollments(id)
        ON DELETE RESTRICT,

    quiz_id UUID NOT NULL
        REFERENCES public.quizzes(id)
        ON DELETE RESTRICT,

    attempt_number INTEGER NOT NULL
        CHECK (attempt_number > 0),

    points_obtained INTEGER NOT NULL DEFAULT 0
        CHECK (points_obtained >= 0),

    points_total INTEGER NOT NULL
        CHECK (points_total > 0),

    score_percentage NUMERIC(5,2) NOT NULL
        CHECK (score_percentage BETWEEN 0 AND 100),

    passed BOOLEAN NOT NULL,

    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (enrollment_id, quiz_id, attempt_number),
    UNIQUE (id, quiz_id),

    CHECK (points_obtained <= points_total)
);


CREATE INDEX idx_quiz_attempts_enrollment
ON public.quiz_attempts(enrollment_id);

CREATE INDEX idx_quiz_attempts_quiz
ON public.quiz_attempts(quiz_id);


-- =====================================================
-- 2. CONTRAINTE POUR LES REPONSES
-- =====================================================

ALTER TABLE public.questions
ADD CONSTRAINT questions_id_quiz_unique
UNIQUE (id, quiz_id);


-- =====================================================
-- 3. REPONSES DES ELEVES
-- =====================================================

CREATE TABLE public.student_answers (
    attempt_id UUID NOT NULL,
    quiz_id UUID NOT NULL,
    question_id UUID NOT NULL,

    selected_option_id UUID,

    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    points_awarded INTEGER NOT NULL DEFAULT 0
        CHECK (points_awarded >= 0),

    answered_at TIMESTAMPTZ,

    PRIMARY KEY (attempt_id, question_id),

    FOREIGN KEY (attempt_id, quiz_id)
        REFERENCES public.quiz_attempts(id, quiz_id)
        ON DELETE RESTRICT,

    FOREIGN KEY (question_id, quiz_id)
        REFERENCES public.questions(id, quiz_id)
        ON DELETE RESTRICT,

    FOREIGN KEY (selected_option_id, question_id)
        REFERENCES public.question_options(id, question_id)
        ON DELETE RESTRICT,

    CHECK (
        selected_option_id IS NOT NULL
        OR (
            is_correct = FALSE
            AND points_awarded = 0
            AND answered_at IS NULL
        )
    )
);


CREATE INDEX idx_student_answers_question
ON public.student_answers(question_id);


-- =====================================================
-- 4. PROGRESSION PAR CHAPITRE
-- =====================================================

CREATE TABLE public.chapter_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_path_id UUID NOT NULL
        REFERENCES public.student_paths(id)
        ON DELETE RESTRICT,

    chapter_id UUID NOT NULL
        REFERENCES public.chapters(id)
        ON DELETE RESTRICT,

    status TEXT NOT NULL DEFAULT 'in_progress'
        CHECK (
            status IN (
                'in_progress',
                'validated',
                'to_review'
            )
        ),

    attempt_count INTEGER NOT NULL DEFAULT 0
        CHECK (attempt_count >= 0),

    best_score NUMERIC(5,2) NOT NULL DEFAULT 0
        CHECK (best_score BETWEEN 0 AND 100),

    latest_score NUMERIC(5,2) NOT NULL DEFAULT 0
        CHECK (latest_score BETWEEN 0 AND 100),

    last_attempt_at TIMESTAMPTZ,

    validated_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (student_path_id, chapter_id)
);


CREATE INDEX idx_chapter_progress_student_path
ON public.chapter_progress(student_path_id);

CREATE INDEX idx_chapter_progress_chapter
ON public.chapter_progress(chapter_id);


CREATE TRIGGER chapter_progress_updated_at
BEFORE UPDATE ON public.chapter_progress
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


-- =====================================================
-- 5. SECURITE RLS
-- =====================================================

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_progress ENABLE ROW LEVEL SECURITY;


-- Un élève consulte uniquement ses tentatives

CREATE POLICY quiz_attempts_select_own
ON public.quiz_attempts
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.student_enrollments e
        JOIN public.student_paths sp
            ON sp.id = e.student_path_id
        WHERE e.id = enrollment_id
          AND sp.student_id = (SELECT auth.uid())
    )
);


-- Un élève consulte uniquement ses réponses

CREATE POLICY student_answers_select_own
ON public.student_answers
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.quiz_attempts qa
        JOIN public.student_enrollments e
            ON e.id = qa.enrollment_id
        JOIN public.student_paths sp
            ON sp.id = e.student_path_id
        WHERE qa.id = attempt_id
          AND qa.quiz_id = quiz_id
          AND sp.student_id = (SELECT auth.uid())
    )
);


-- Un élève consulte uniquement sa progression

CREATE POLICY chapter_progress_select_own
ON public.chapter_progress
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.student_paths sp
        WHERE sp.id = student_path_id
          AND sp.student_id = (SELECT auth.uid())
    )
);


-- Pas d'écriture directe depuis le navigateur

REVOKE ALL ON public.quiz_attempts,
              public.student_answers,
              public.chapter_progress
FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.quiz_attempts,
                public.student_answers,
                public.chapter_progress
TO authenticated;


-- =====================================================
-- 6. FONCTION SECURISEE DE SOUMISSION DU QUIZ
-- =====================================================

CREATE OR REPLACE FUNCTION public.submit_quiz(
    p_quiz_id UUID,
    p_answers JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_user_id UUID;
    v_role TEXT;

    v_enrollment_id UUID;
    v_student_path_id UUID;
    v_school_level_id UUID;

    v_chapter_id UUID;
    v_quiz_level_id UUID;
    v_passing_score INTEGER;

    v_question_count BIGINT;
    v_key_count BIGINT;

    v_points_total INTEGER;
    v_points_obtained INTEGER;

    v_score NUMERIC(5,2);
    v_passed BOOLEAN;

    v_attempt_number INTEGER;
    v_attempt_id UUID;

    v_item JSONB;
    v_question_id UUID;
    v_option_id UUID;
    v_seen_questions UUID[] := ARRAY[]::UUID[];

    v_progress_status TEXT;
BEGIN

    -- Authentification
    v_user_id := auth.uid();

    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentification requise.';
    END IF;


    -- Vérification du rôle
    SELECT role
    INTO v_role
    FROM public.profiles
    WHERE id = v_user_id;

    IF v_role IS DISTINCT FROM 'student' THEN
        RAISE EXCEPTION 'Seuls les élèves peuvent passer les quiz.';
    END IF;


    -- Vérification du format des réponses
    IF p_answers IS NULL
       OR pg_catalog.jsonb_typeof(p_answers) <> 'array' THEN
        RAISE EXCEPTION 'Les réponses doivent être un tableau JSON.';
    END IF;


    -- Recherche de l'inscription active
    SELECT
        e.id,
        e.student_path_id,
        e.school_level_id
    INTO
        v_enrollment_id,
        v_student_path_id,
        v_school_level_id
    FROM public.student_enrollments e
    JOIN public.student_paths sp
        ON sp.id = e.student_path_id
    WHERE sp.student_id = v_user_id
      AND sp.status = 'active'
      AND e.status = 'active'
      AND e.ended_at IS NULL
    LIMIT 1;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Aucune inscription scolaire active.';
    END IF;


    -- Vérification du quiz et du chapitre
    SELECT
        q.chapter_id,
        q.passing_score,
        c.school_level_id
    INTO
        v_chapter_id,
        v_passing_score,
        v_quiz_level_id
    FROM public.quizzes q
    JOIN public.chapters c
        ON c.id = q.chapter_id
    WHERE q.id = p_quiz_id
      AND q.is_published = TRUE
      AND c.is_published = TRUE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Quiz introuvable ou non publié.';
    END IF;


    -- Vérification du niveau de l'élève
    IF v_quiz_level_id <> v_school_level_id THEN
        RAISE EXCEPTION 'Ce quiz ne correspond pas à votre niveau scolaire.';
    END IF;


    -- Verrouillage pour éviter deux numéros de tentative identiques
    PERFORM pg_catalog.pg_advisory_xact_lock(
        pg_catalog.hashtextextended(
            v_enrollment_id::TEXT || ':' || p_quiz_id::TEXT,
            0::BIGINT
        )
    );


    -- Vérification des questions et des bonnes réponses
    SELECT
        COUNT(*),
        COUNT(k.question_id),
        COALESCE(SUM(q.points), 0)
    INTO
        v_question_count,
        v_key_count,
        v_points_total
    FROM public.questions q
    LEFT JOIN public.question_answer_keys k
        ON k.question_id = q.id
    WHERE q.quiz_id = p_quiz_id;

    IF v_question_count = 0 THEN
        RAISE EXCEPTION 'Ce quiz ne contient aucune question.';
    END IF;

    IF v_question_count <> v_key_count THEN
        RAISE EXCEPTION 'Certaines questions ne possèdent pas de bonne réponse.';
    END IF;

    IF v_points_total <= 0 THEN
        RAISE EXCEPTION 'Le total des points du quiz est invalide.';
    END IF;


    -- Validation de chaque réponse envoyée
    FOR v_item IN
        SELECT value
        FROM pg_catalog.jsonb_array_elements(p_answers)
        AS items(value)
    LOOP

        IF pg_catalog.jsonb_typeof(v_item) <> 'object'
           OR v_item ->> 'question_id' IS NULL
           OR v_item ->> 'option_id' IS NULL THEN
            RAISE EXCEPTION 'Format de réponse invalide.';
        END IF;

        BEGIN
            v_question_id := (v_item ->> 'question_id')::UUID;
            v_option_id := (v_item ->> 'option_id')::UUID;
        EXCEPTION
            WHEN invalid_text_representation THEN
                RAISE EXCEPTION 'Identifiant de question ou de réponse invalide.';
        END;


        IF v_question_id = ANY(v_seen_questions) THEN
            RAISE EXCEPTION 'Une question apparaît plusieurs fois.';
        END IF;

        v_seen_questions := pg_catalog.array_append(
            v_seen_questions,
            v_question_id
        );


        -- Vérifier que l'option appartient à la question
        IF NOT EXISTS (
            SELECT 1
            FROM public.questions q
            JOIN public.question_options o
                ON o.question_id = q.id
            WHERE q.id = v_question_id
              AND q.quiz_id = p_quiz_id
              AND o.id = v_option_id
        ) THEN
            RAISE EXCEPTION 'Réponse inconnue ou ne correspondant pas à la question.';
        END IF;

    END LOOP;


    -- Calcul des points obtenus
    SELECT COALESCE(
        SUM(
            CASE
                WHEN a.option_id = k.correct_option_id
                    THEN q.points
                ELSE 0
            END
        ),
        0
    )::INTEGER
    INTO v_points_obtained
    FROM public.questions q
    JOIN public.question_answer_keys k
        ON k.question_id = q.id
    LEFT JOIN LATERAL (
        SELECT (item ->> 'option_id')::UUID AS option_id
        FROM pg_catalog.jsonb_array_elements(p_answers)
        AS answers(item)
        WHERE item ->> 'question_id' = q.id::TEXT
    ) a ON TRUE
    WHERE q.quiz_id = p_quiz_id;


    -- Calcul du score
    v_score := ROUND(
        (v_points_obtained::NUMERIC * 100)
        / v_points_total,
        2
    );

    v_passed := v_score >= v_passing_score;


    -- Numéro de tentative
    SELECT COALESCE(MAX(attempt_number), 0) + 1
    INTO v_attempt_number
    FROM public.quiz_attempts
    WHERE enrollment_id = v_enrollment_id
      AND quiz_id = p_quiz_id;


    -- Création de la tentative
    INSERT INTO public.quiz_attempts (
        enrollment_id,
        quiz_id,
        attempt_number,
        points_obtained,
        points_total,
        score_percentage,
        passed
    )
    VALUES (
        v_enrollment_id,
        p_quiz_id,
        v_attempt_number,
        v_points_obtained,
        v_points_total,
        v_score,
        v_passed
    )
    RETURNING id INTO v_attempt_id;


    -- Enregistrement de toutes les réponses,
    -- y compris les questions laissées sans réponse
    INSERT INTO public.student_answers (
        attempt_id,
        quiz_id,
        question_id,
        selected_option_id,
        is_correct,
        points_awarded,
        answered_at
    )
    SELECT
        v_attempt_id,
        q.quiz_id,
        q.id,
        a.option_id,
        COALESCE(a.option_id = k.correct_option_id, FALSE),
        CASE
            WHEN a.option_id = k.correct_option_id
                THEN q.points
            ELSE 0
        END,
        CASE
            WHEN a.option_id IS NOT NULL THEN NOW()
            ELSE NULL
        END
    FROM public.questions q
    JOIN public.question_answer_keys k
        ON k.question_id = q.id
    LEFT JOIN LATERAL (
        SELECT (item ->> 'option_id')::UUID AS option_id
        FROM pg_catalog.jsonb_array_elements(p_answers)
        AS answers(item)
        WHERE item ->> 'question_id' = q.id::TEXT
    ) a ON TRUE
    WHERE q.quiz_id = p_quiz_id;


    -- Mise à jour de la progression
    INSERT INTO public.chapter_progress (
        student_path_id,
        chapter_id,
        status,
        attempt_count,
        best_score,
        latest_score,
        last_attempt_at,
        validated_at
    )
    VALUES (
        v_student_path_id,
        v_chapter_id,
        CASE
            WHEN v_passed THEN 'validated'
            ELSE 'in_progress'
        END,
        1,
        v_score,
        v_score,
        NOW(),
        CASE WHEN v_passed THEN NOW() ELSE NULL END
    )
    ON CONFLICT (student_path_id, chapter_id)
    DO UPDATE SET

        attempt_count =
            public.chapter_progress.attempt_count + 1,

        best_score = GREATEST(
            public.chapter_progress.best_score,
            EXCLUDED.latest_score
        ),

        latest_score = EXCLUDED.latest_score,

        status = CASE
            WHEN public.chapter_progress.status = 'validated'
                OR EXCLUDED.status = 'validated'
                THEN 'validated'

            WHEN public.chapter_progress.attempt_count + 1 >= 3
                THEN 'to_review'

            ELSE 'in_progress'
        END,

        validated_at = CASE
            WHEN public.chapter_progress.validated_at IS NOT NULL
                THEN public.chapter_progress.validated_at
            WHEN EXCLUDED.status = 'validated'
                THEN NOW()
            ELSE NULL
        END,

        last_attempt_at = NOW()

    RETURNING status INTO v_progress_status;


    -- Résultat retourné au backend
    RETURN pg_catalog.jsonb_build_object(
        'attempt_id', v_attempt_id,
        'attempt_number', v_attempt_number,
        'points_obtained', v_points_obtained,
        'points_total', v_points_total,
        'score_percentage', v_score,
        'passed', v_passed,
        'progress_status', v_progress_status
    );

END;
$$;


-- =====================================================
-- 7. SECURISATION DE LA FONCTION
-- =====================================================

REVOKE ALL ON FUNCTION public.submit_quiz(UUID, JSONB)
FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.submit_quiz(UUID, JSONB)
TO authenticated;
