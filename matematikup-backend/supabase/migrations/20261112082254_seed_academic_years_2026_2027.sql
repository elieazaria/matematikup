
-- =====================================================
-- MATEMATIKUP
-- MIGRATION 005 : ANNEES SCOLAIRES INITIALES
-- =====================================================

-- Désactiver une éventuelle ancienne année active
UPDATE public.academic_years
SET is_active = FALSE
WHERE is_active = TRUE
  AND system_id IN (
      SELECT id
      FROM public.school_systems
      WHERE code IN ('MG', 'FR')
  );

-- Insérer les années scolaires 2026-2027
INSERT INTO public.academic_years (
    system_id,
    label,
    starts_on,
    ends_on,
    is_active
)
SELECT
    ss.id,
    data.label,
    data.starts_on,
    data.ends_on,
    TRUE
FROM public.school_systems ss
JOIN (
    VALUES
        (
            'MG',
            '2026-2027',
            DATE '2026-09-07',
            DATE '2027-06-30'
        ),
        (
            'FR',
            '2026-2027',
            DATE '2026-09-02',
            DATE '2027-07-03'
        )
) AS data(code, label, starts_on, ends_on)
ON data.code = ss.code
WHERE ss.code IN ('MG', 'FR')
ON CONFLICT (system_id, label)
DO UPDATE SET
    starts_on = EXCLUDED.starts_on,
    ends_on = EXCLUDED.ends_on,
    is_active = TRUE;
