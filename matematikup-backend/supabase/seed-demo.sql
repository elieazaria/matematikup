
-- =====================================================
-- MATEMATIKUP : CONTENU DE DEMONSTRATION
-- Programme FR - Classe de 3e
-- Chapitre : Fonctions affines
-- =====================================================

DO $$
DECLARE
    v_level_id UUID;
    v_chapter_id UUID;
BEGIN

    -- Récupérer le niveau français 3e
    SELECT sl.id
    INTO v_level_id
    FROM public.school_levels sl
    JOIN public.school_systems ss
        ON ss.id = sl.system_id
    WHERE ss.code = 'FR'
      AND sl.code = '3E';

    IF v_level_id IS NULL THEN
        RAISE EXCEPTION 'Niveau français 3e introuvable.';
    END IF;

    -- Chercher le chapitre existant
    SELECT id
    INTO v_chapter_id
    FROM public.chapters
    WHERE school_level_id = v_level_id
      AND title = 'Fonctions affines';

    -- Créer le chapitre s'il n'existe pas
    IF v_chapter_id IS NULL THEN

        INSERT INTO public.chapters (
            school_level_id,
            title,
            description,
            position,
            is_published
        )
        VALUES (
            v_level_id,
            'Fonctions affines',
            'Découvrir les fonctions affines, calculer leurs images et comprendre leur représentation graphique.',
            COALESCE(
                (
                    SELECT MAX(position) + 1
                    FROM public.chapters
                    WHERE school_level_id = v_level_id
                ),
                1
            ),
            TRUE
        )
        RETURNING id INTO v_chapter_id;

    END IF;

    -- Publier et actualiser le chapitre
    UPDATE public.chapters
    SET
        description = 'Découvrir les fonctions affines, calculer leurs images et comprendre leur représentation graphique.',
        is_published = TRUE
    WHERE id = v_chapter_id;

    -- LEÇON 1
    INSERT INTO public.lessons (
        chapter_id,
        title,
        content,
        position,
        is_published
    )
    VALUES (
        v_chapter_id,
        'Découvrir les fonctions affines',
        $lesson1$
# Découvrir les fonctions affines

## 1. Définition

Une fonction affine est une fonction qui peut s'écrire sous la forme :

**f(x) = ax + b**

où :
- a est le coefficient directeur ;
- b est l'ordonnée à l'origine ;
- x est la variable.

## 2. Exemple

Soit la fonction :

**f(x) = 2x + 3**

Pour calculer l'image de 4 :

f(4) = 2 × 4 + 3

f(4) = 8 + 3

**f(4) = 11**

L'image de 4 est donc 11.

## 3. À retenir

Une fonction affine est composée d'une partie proportionnelle ax et d'une constante b.
$lesson1$,
        1,
        TRUE
    )
    ON CONFLICT (chapter_id, position)
    DO UPDATE SET
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        is_published = TRUE;

    -- LEÇON 2
    INSERT INTO public.lessons (
        chapter_id,
        title,
        content,
        position,
        is_published
    )
    VALUES (
        v_chapter_id,
        'Représentation graphique',
        $lesson2$
# Représentation graphique d'une fonction affine

## 1. Propriété

La représentation graphique d'une fonction affine est une droite.

Pour une fonction :

**f(x) = ax + b**

- a représente le coefficient directeur ;
- b représente l'ordonnée à l'origine.

## 2. Exemple

Soit :

**f(x) = 2x + 1**

Calculons quelques images :

- f(0) = 1
- f(1) = 3
- f(2) = 5

Nous obtenons les points :

A(0 ; 1), B(1 ; 3) et C(2 ; 5).

Ces points appartiennent à une même droite.

## 3. À retenir

Pour représenter graphiquement une fonction affine, il suffit de déterminer deux points de sa droite.
$lesson2$,
        2,
        TRUE
    )
    ON CONFLICT (chapter_id, position)
    DO UPDATE SET
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        is_published = TRUE;

    RAISE NOTICE 'Chapitre et deux leçons créés : %', v_chapter_id;

END;
$$;
