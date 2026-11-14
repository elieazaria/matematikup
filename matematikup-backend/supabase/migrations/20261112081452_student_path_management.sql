
-- =====================================================
-- MATEMATIKUP
-- MIGRATION 004 : GESTION DES PARCOURS SCOLAIRES
-- =====================================================


-- =====================================================
-- 1. PREMIERE INSCRIPTION D'UN ELEVE
-- =====================================================

CREATE OR REPLACE FUNCTION public.start_student_path(
    p_system_code TEXT,
    p_level_code TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_student_id UUID;
    v_role TEXT;

    v_system_id UUID;
    v_system_code TEXT;

    v_level_id UUID;
    v_level_code TEXT;

    v_year_id UUID;
    v_year_label TEXT;

    v_path_id UUID;
    v_enrollment_id UUID;
BEGIN

    v_student_id := auth.uid();

    IF v_student_id IS NULL THEN
        RAISE EXCEPTION 'Authentification requise.';
    END IF;

    -- Verrouillage par élève
    PERFORM pg_catalog.pg_advisory_xact_lock(
        pg_catalog.hashtextextended(
            'student-path:' || v_student_id::TEXT,
            0::BIGINT
        )
    );

    -- Vérifier le rôle
    SELECT p.role
    INTO v_role
    FROM public.profiles p
    WHERE p.id = v_student_id;

    IF v_role IS DISTINCT FROM 'student' THEN
        RAISE EXCEPTION 'Seuls les élèves peuvent créer un parcours.';
    END IF;

    -- Vérifier le système scolaire
    SELECT s.id, s.code
    INTO v_system_id, v_system_code
    FROM public.school_systems s
    WHERE s.code = pg_catalog.upper(pg_catalog.btrim(p_system_code))
      AND s.is_active = TRUE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Système scolaire inconnu ou inactif.';
    END IF;

    -- Vérifier le niveau
    SELECT l.id, l.code
    INTO v_level_id, v_level_code
    FROM public.school_levels l
    WHERE l.system_id = v_system_id
      AND l.code = pg_catalog.upper(pg_catalog.btrim(p_level_code));

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Niveau scolaire invalide pour ce système.';
    END IF;

    -- Récupérer l'année scolaire active
    SELECT a.id, a.label
    INTO v_year_id, v_year_label
    FROM public.academic_years a
    WHERE a.system_id = v_system_id
      AND a.is_active = TRUE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Aucune année scolaire active pour ce système.';
    END IF;

    -- Vérifier qu'il n'existe pas déjà un parcours actif
    IF EXISTS (
        SELECT 1
        FROM public.student_paths sp
        WHERE sp.student_id = v_student_id
          AND sp.status = 'active'
    ) THEN
        RAISE EXCEPTION 'Un parcours scolaire actif existe déjà.';
    END IF;

    -- Créer le parcours
    INSERT INTO public.student_paths (
        student_id,
        system_id,
        status
    )
    VALUES (
        v_student_id,
        v_system_id,
        'active'
    )
    RETURNING id INTO v_path_id;

    -- Créer l'inscription annuelle
    INSERT INTO public.student_enrollments (
        student_path_id,
        system_id,
        academic_year_id,
        school_level_id,
        status
    )
    VALUES (
        v_path_id,
        v_system_id,
        v_year_id,
        v_level_id,
        'active'
    )
    RETURNING id INTO v_enrollment_id;

    RETURN pg_catalog.jsonb_build_object(
        'success', TRUE,
        'message', 'Parcours scolaire créé.',
        'student_path_id', v_path_id,
        'enrollment_id', v_enrollment_id,
        'system', v_system_code,
        'level', v_level_code,
        'academic_year', v_year_label
    );

END;
$$;


-- =====================================================
-- 2. CHANGER DE SYSTEME SCOLAIRE
-- =====================================================

CREATE OR REPLACE FUNCTION public.change_student_system(
    p_system_code TEXT,
    p_level_code TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_student_id UUID;
    v_role TEXT;

    v_current_path_id UUID;
    v_current_system_id UUID;

    v_system_id UUID;
    v_system_code TEXT;

    v_level_id UUID;
    v_level_code TEXT;

    v_year_id UUID;
    v_year_label TEXT;

    v_new_path_id UUID;
    v_enrollment_id UUID;
BEGIN

    v_student_id := auth.uid();

    IF v_student_id IS NULL THEN
        RAISE EXCEPTION 'Authentification requise.';
    END IF;

    PERFORM pg_catalog.pg_advisory_xact_lock(
        pg_catalog.hashtextextended(
            'student-path:' || v_student_id::TEXT,
            0::BIGINT
        )
    );

    SELECT p.role
    INTO v_role
    FROM public.profiles p
    WHERE p.id = v_student_id;

    IF v_role IS DISTINCT FROM 'student' THEN
        RAISE EXCEPTION 'Seuls les élèves peuvent changer de système.';
    END IF;

    -- Vérifier le nouveau système
    SELECT s.id, s.code
    INTO v_system_id, v_system_code
    FROM public.school_systems s
    WHERE s.code = pg_catalog.upper(pg_catalog.btrim(p_system_code))
      AND s.is_active = TRUE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Système scolaire inconnu ou inactif.';
    END IF;

    -- Vérifier le niveau demandé
    SELECT l.id, l.code
    INTO v_level_id, v_level_code
    FROM public.school_levels l
    WHERE l.system_id = v_system_id
      AND l.code = pg_catalog.upper(pg_catalog.btrim(p_level_code));

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Niveau invalide pour le nouveau système.';
    END IF;

    -- Vérifier l'année scolaire du nouveau système
    SELECT a.id, a.label
    INTO v_year_id, v_year_label
    FROM public.academic_years a
    WHERE a.system_id = v_system_id
      AND a.is_active = TRUE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Aucune année scolaire active pour le nouveau système.';
    END IF;

    -- Récupérer et verrouiller le parcours actuel
    SELECT sp.id, sp.system_id
    INTO v_current_path_id, v_current_system_id
    FROM public.student_paths sp
    WHERE sp.student_id = v_student_id
      AND sp.status = 'active'
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Aucun parcours scolaire actif.';
    END IF;

    IF v_current_system_id = v_system_id THEN
        RAISE EXCEPTION 'Vous utilisez déjà ce système scolaire.';
    END IF;

    -- Clôturer l'inscription active
    UPDATE public.student_enrollments
    SET
        status = 'interrupted',
        ended_at = pg_catalog.now()
    WHERE student_path_id = v_current_path_id
      AND status = 'active';

    -- Clôturer l'ancien parcours
    UPDATE public.student_paths
    SET
        status = 'closed',
        ended_at = pg_catalog.now()
    WHERE id = v_current_path_id;

    -- Créer le nouveau parcours
    INSERT INTO public.student_paths (
        student_id,
        system_id,
        status
    )
    VALUES (
        v_student_id,
        v_system_id,
        'active'
    )
    RETURNING id INTO v_new_path_id;

    -- Créer la nouvelle inscription
    INSERT INTO public.student_enrollments (
        student_path_id,
        system_id,
        academic_year_id,
        school_level_id,
        status
    )
    VALUES (
        v_new_path_id,
        v_system_id,
        v_year_id,
        v_level_id,
        'active'
    )
    RETURNING id INTO v_enrollment_id;

    RETURN pg_catalog.jsonb_build_object(
        'success', TRUE,
        'message', 'Système scolaire changé. Nouveau parcours créé.',
        'student_path_id', v_new_path_id,
        'enrollment_id', v_enrollment_id,
        'system', v_system_code,
        'level', v_level_code,
        'academic_year', v_year_label
    );

END;
$$;


-- =====================================================
-- 3. RENOUVELER L'INSCRIPTION POUR UNE NOUVELLE ANNEE
-- =====================================================

CREATE OR REPLACE FUNCTION public.renew_student_enrollment(
    p_level_code TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_student_id UUID;
    v_role TEXT;

    v_path_id UUID;
    v_system_id UUID;

    v_system_code TEXT;
    v_level_id UUID;
    v_level_code TEXT;

    v_year_id UUID;
    v_year_label TEXT;

    v_enrollment_id UUID;
BEGIN

    v_student_id := auth.uid();

    IF v_student_id IS NULL THEN
        RAISE EXCEPTION 'Authentification requise.';
    END IF;

    PERFORM pg_catalog.pg_advisory_xact_lock(
        pg_catalog.hashtextextended(
            'student-path:' || v_student_id::TEXT,
            0::BIGINT
        )
    );

    SELECT p.role
    INTO v_role
    FROM public.profiles p
    WHERE p.id = v_student_id;

    IF v_role IS DISTINCT FROM 'student' THEN
        RAISE EXCEPTION 'Seuls les élèves peuvent renouveler leur inscription.';
    END IF;

    -- Récupérer le parcours actif
    SELECT sp.id, sp.system_id
    INTO v_path_id, v_system_id
    FROM public.student_paths sp
    WHERE sp.student_id = v_student_id
      AND sp.status = 'active'
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Aucun parcours scolaire actif.';
    END IF;

    -- Vérifier le système
    SELECT s.code
    INTO v_system_code
    FROM public.school_systems s
    WHERE s.id = v_system_id
      AND s.is_active = TRUE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Le système scolaire est inactif.';
    END IF;

    -- Vérifier le niveau
    SELECT l.id, l.code
    INTO v_level_id, v_level_code
    FROM public.school_levels l
    WHERE l.system_id = v_system_id
      AND l.code = pg_catalog.upper(pg_catalog.btrim(p_level_code));

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Niveau scolaire invalide.';
    END IF;

    -- Récupérer la nouvelle année active
    SELECT a.id, a.label
    INTO v_year_id, v_year_label
    FROM public.academic_years a
    WHERE a.system_id = v_system_id
      AND a.is_active = TRUE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Aucune année scolaire active.';
    END IF;

    -- Vérifier que l'élève n'est pas déjà inscrit
    IF EXISTS (
        SELECT 1
        FROM public.student_enrollments e
        WHERE e.student_path_id = v_path_id
          AND e.academic_year_id = v_year_id
    ) THEN
        RAISE EXCEPTION 'L''élève est déjà inscrit pour cette année scolaire.';
    END IF;

    -- Clôturer l'ancienne inscription
    UPDATE public.student_enrollments
    SET
        status = 'completed',
        ended_at = pg_catalog.now()
    WHERE student_path_id = v_path_id
      AND status = 'active';

    -- Créer la nouvelle inscription
    INSERT INTO public.student_enrollments (
        student_path_id,
        system_id,
        academic_year_id,
        school_level_id,
        status
    )
    VALUES (
        v_path_id,
        v_system_id,
        v_year_id,
        v_level_id,
        'active'
    )
    RETURNING id INTO v_enrollment_id;

    RETURN pg_catalog.jsonb_build_object(
        'success', TRUE,
        'message', 'Inscription scolaire renouvelée.',
        'student_path_id', v_path_id,
        'enrollment_id', v_enrollment_id,
        'system', v_system_code,
        'level', v_level_code,
        'academic_year', v_year_label
    );

END;
$$;


-- =====================================================
-- 4. SECURISATION DES FONCTIONS
-- =====================================================

REVOKE ALL ON FUNCTION public.start_student_path(TEXT, TEXT)
FROM PUBLIC, anon;

REVOKE ALL ON FUNCTION public.change_student_system(TEXT, TEXT)
FROM PUBLIC, anon;

REVOKE ALL ON FUNCTION public.renew_student_enrollment(TEXT)
FROM PUBLIC, anon;


GRANT EXECUTE ON FUNCTION public.start_student_path(TEXT, TEXT)
TO authenticated;

GRANT EXECUTE ON FUNCTION public.change_student_system(TEXT, TEXT)
TO authenticated;

GRANT EXECUTE ON FUNCTION public.renew_student_enrollment(TEXT)
TO authenticated;
