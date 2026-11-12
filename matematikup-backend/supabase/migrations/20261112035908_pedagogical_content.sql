
-- =====================================================
-- MATEMATIKUP
-- MIGRATION 002 : CONTENUS PEDAGOGIQUES
-- =====================================================

-- 1. CHAPITRES
CREATE TABLE public.chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    school_level_id UUID NOT NULL
        REFERENCES public.school_levels(id)
        ON DELETE RESTRICT,

    title TEXT NOT NULL,
    description TEXT,

    position SMALLINT NOT NULL
        CHECK (position > 0),

    is_published BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (school_level_id, position)
);

CREATE INDEX idx_chapters_school_level
ON public.chapters(school_level_id);


-- 2. LEÇONS
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    chapter_id UUID NOT NULL
        REFERENCES public.chapters(id)
        ON DELETE RESTRICT,

    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',

    position SMALLINT NOT NULL
        CHECK (position > 0),

    is_published BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (chapter_id, position)
);

CREATE INDEX idx_lessons_chapter
ON public.lessons(chapter_id);


-- 3. QUIZ
CREATE TABLE public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    chapter_id UUID NOT NULL UNIQUE
        REFERENCES public.chapters(id)
        ON DELETE RESTRICT,

    title TEXT NOT NULL,

    passing_score SMALLINT NOT NULL DEFAULT 70
        CHECK (passing_score BETWEEN 1 AND 100),

    is_published BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 4. QUESTIONS
CREATE TABLE public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    quiz_id UUID NOT NULL
        REFERENCES public.quizzes(id)
        ON DELETE RESTRICT,

    question_text TEXT NOT NULL,

    position SMALLINT NOT NULL
        CHECK (position > 0),

    points SMALLINT NOT NULL DEFAULT 1
        CHECK (points > 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (quiz_id, position)
);

CREATE INDEX idx_questions_quiz
ON public.questions(quiz_id);


-- 5. PROPOSITIONS DE REPONSES
CREATE TABLE public.question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    question_id UUID NOT NULL
        REFERENCES public.questions(id)
        ON DELETE RESTRICT,

    option_text TEXT NOT NULL,

    position SMALLINT NOT NULL
        CHECK (position > 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (question_id, position),

    UNIQUE (id, question_id)
);

CREATE INDEX idx_question_options_question
ON public.question_options(question_id);


-- 6. BONNES REPONSES (TABLE PRIVEE)
CREATE TABLE public.question_answer_keys (
    question_id UUID PRIMARY KEY
        REFERENCES public.questions(id)
        ON DELETE RESTRICT,

    correct_option_id UUID NOT NULL,

    explanation TEXT,

    FOREIGN KEY (correct_option_id, question_id)
        REFERENCES public.question_options(id, question_id)
        ON DELETE RESTRICT
);


-- =====================================================
-- 7. SECURITE RLS
-- =====================================================

ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_answer_keys ENABLE ROW LEVEL SECURITY;


-- Lecture des chapitres publiés
CREATE POLICY chapters_read_published
ON public.chapters
FOR SELECT
TO authenticated
USING (is_published = TRUE);


-- Lecture des leçons publiées
CREATE POLICY lessons_read_published
ON public.lessons
FOR SELECT
TO authenticated
USING (
    is_published = TRUE
    AND EXISTS (
        SELECT 1
        FROM public.chapters c
        WHERE c.id = chapter_id
        AND c.is_published = TRUE
    )
);


-- Lecture des quiz publiés
CREATE POLICY quizzes_read_published
ON public.quizzes
FOR SELECT
TO authenticated
USING (
    is_published = TRUE
    AND EXISTS (
        SELECT 1
        FROM public.chapters c
        WHERE c.id = chapter_id
        AND c.is_published = TRUE
    )
);


-- Lecture des questions des quiz publiés
CREATE POLICY questions_read_published
ON public.questions
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.quizzes q
        JOIN public.chapters c
            ON c.id = q.chapter_id
        WHERE q.id = quiz_id
          AND q.is_published = TRUE
          AND c.is_published = TRUE
    )
);


-- Lecture des propositions des quiz publiés
CREATE POLICY question_options_read_published
ON public.question_options
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.questions qu
        JOIN public.quizzes q
            ON q.id = qu.quiz_id
        JOIN public.chapters c
            ON c.id = q.chapter_id
        WHERE qu.id = question_id
          AND q.is_published = TRUE
          AND c.is_published = TRUE
    )
);


-- Les bonnes réponses ne sont accessibles
-- directement ni aux utilisateurs anonymes
-- ni aux utilisateurs authentifiés.

REVOKE ALL ON public.question_answer_keys
FROM PUBLIC, anon, authenticated;


-- =====================================================
-- 8. DROITS DE LECTURE
-- =====================================================

REVOKE ALL ON public.chapters,
              public.lessons,
              public.quizzes,
              public.questions,
              public.question_options
FROM anon, authenticated;

GRANT SELECT ON public.chapters,
                public.lessons,
                public.quizzes,
                public.questions,
                public.question_options
TO authenticated;
