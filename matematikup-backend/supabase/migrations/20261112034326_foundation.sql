
-- =====================================================
-- MATEMATIKUP
-- MIGRATION 001 : FONDATIONS
-- =====================================================

-- =====================================================
-- 1. PROFILS UTILISATEURS
-- =====================================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id)
        ON DELETE CASCADE,

    full_name TEXT NOT NULL DEFAULT '',

    role TEXT NOT NULL DEFAULT 'student'
        CHECK (role IN ('student', 'parent', 'admin')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = pg_catalog.now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


-- Création automatique du profil après inscription
-- Le rôle est toujours student par défaut.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
    );

    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();


-- =====================================================
-- 2. SYSTEMES SCOLAIRES
-- =====================================================

CREATE TABLE public.school_systems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT school_systems_code_check
        CHECK (code IN ('MG', 'FR'))
);


-- =====================================================
-- 3. NIVEAUX SCOLAIRES
-- =====================================================

CREATE TABLE public.school_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    system_id UUID NOT NULL
        REFERENCES public.school_systems(id),

    code TEXT NOT NULL,
    name TEXT NOT NULL,

    cycle TEXT NOT NULL
        CHECK (cycle IN ('college', 'lycee')),

    sort_order SMALLINT NOT NULL
        CHECK (sort_order BETWEEN 1 AND 7),

    UNIQUE (system_id, code),
    UNIQUE (system_id, sort_order),
    UNIQUE (id, system_id)
);


-- =====================================================
-- 4. ANNEES SCOLAIRES
-- =====================================================

CREATE TABLE public.academic_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    system_id UUID NOT NULL
        REFERENCES public.school_systems(id),

    label TEXT NOT NULL,

    starts_on DATE NOT NULL,
    ends_on DATE NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (system_id, label),
    UNIQUE (id, system_id),

    CHECK (starts_on < ends_on)
);

-- Une seule année active par système scolaire
CREATE UNIQUE INDEX academic_years_one_active_per_system
ON public.academic_years (system_id)
WHERE is_active = TRUE;


-- =====================================================
-- 5. PARCOURS SCOLAIRES DES ELEVES
-- =====================================================

CREATE TABLE public.student_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE RESTRICT,

    system_id UUID NOT NULL
        REFERENCES public.school_systems(id),

    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'closed')),

    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (id, system_id),

    CHECK (
        (status = 'active' AND ended_at IS NULL)
        OR
        (status = 'closed' AND ended_at IS NOT NULL)
    )
);

-- Un seul parcours actif par élève
CREATE UNIQUE INDEX student_paths_one_active
ON public.student_paths (student_id)
WHERE status = 'active';

CREATE INDEX idx_student_paths_student
ON public.student_paths (student_id);


-- =====================================================
-- 6. INSCRIPTIONS ANNUELLES
-- =====================================================

CREATE TABLE public.student_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_path_id UUID NOT NULL,
    system_id UUID NOT NULL,

    academic_year_id UUID NOT NULL,
    school_level_id UUID NOT NULL,

    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'completed', 'interrupted')),

    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Vérification de la cohérence du système scolaire
    FOREIGN KEY (student_path_id, system_id)
        REFERENCES public.student_paths(id, system_id),

    FOREIGN KEY (academic_year_id, system_id)
        REFERENCES public.academic_years(id, system_id),

    FOREIGN KEY (school_level_id, system_id)
        REFERENCES public.school_levels(id, system_id),

    UNIQUE (student_path_id, academic_year_id),

    CHECK (
        (status = 'active' AND ended_at IS NULL)
        OR
        (status IN ('completed', 'interrupted')
            AND ended_at IS NOT NULL)
    )
);

-- Un seul niveau actif par parcours
CREATE UNIQUE INDEX student_enrollments_one_active
ON public.student_enrollments (student_path_id)
WHERE status = 'active';

CREATE INDEX idx_enrollments_path
ON public.student_enrollments (student_path_id);

CREATE INDEX idx_enrollments_year
ON public.student_enrollments (academic_year_id);


-- =====================================================
-- 7. DONNEES INITIALES : SYSTEMES SCOLAIRES
-- =====================================================

INSERT INTO public.school_systems (code, name)
VALUES
    ('MG', 'Programme malgache'),
    ('FR', 'Programme français');


-- =====================================================
-- 8. DONNEES INITIALES : 7 NIVEAUX PAR SYSTEME
-- =====================================================

INSERT INTO public.school_levels
    (system_id, code, name, cycle, sort_order)

SELECT
    ss.id,
    levels.code,
    levels.name,
    levels.cycle,
    levels.sort_order

FROM public.school_systems ss

CROSS JOIN (
    VALUES
        ('6E',   '6e',       'college', 1),
        ('5E',   '5e',       'college', 2),
        ('4E',   '4e',       'college', 3),
        ('3E',   '3e',       'college', 4),
        ('2NDE', 'Seconde',  'lycee',   5),
        ('1ERE', 'Première', 'lycee',   6),
        ('TLE',  'Terminale','lycee',   7)
) AS levels(code, name, cycle, sort_order)

WHERE ss.code IN ('MG', 'FR');


-- =====================================================
-- 9. SECURITE : ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_enrollments ENABLE ROW LEVEL SECURITY;


-- Profils : lecture et modification de son propre profil

CREATE POLICY profiles_select_own
ON public.profiles
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = id);

CREATE POLICY profiles_update_own
ON public.profiles
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = id)
WITH CHECK ((SELECT auth.uid()) = id);


-- Catalogues scolaires accessibles en lecture

CREATE POLICY school_systems_public_read
ON public.school_systems
FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);

CREATE POLICY school_levels_public_read
ON public.school_levels
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.school_systems ss
        WHERE ss.id = system_id
          AND ss.is_active = TRUE
    )
);

CREATE POLICY academic_years_public_read
ON public.academic_years
FOR SELECT
TO anon, authenticated
USING (TRUE);


-- Les élèves peuvent consulter leurs propres parcours

CREATE POLICY student_paths_read_own
ON public.student_paths
FOR SELECT
TO authenticated
USING (student_id = (SELECT auth.uid()));


-- Les élèves peuvent consulter leurs propres inscriptions

CREATE POLICY student_enrollments_read_own
ON public.student_enrollments
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


-- =====================================================
-- 10. DROITS D'ACCES
-- =====================================================

REVOKE ALL ON public.profiles
FROM anon, authenticated;

GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE (full_name) ON public.profiles TO authenticated;

REVOKE ALL ON public.school_systems,
              public.school_levels,
              public.academic_years,
              public.student_paths,
              public.student_enrollments
FROM anon, authenticated;

GRANT SELECT ON public.school_systems,
                public.school_levels,
                public.academic_years
TO anon, authenticated;

GRANT SELECT ON public.student_paths,
                public.student_enrollments
TO authenticated;

REVOKE ALL ON FUNCTION public.handle_new_user()
FROM PUBLIC, anon, authenticated;
