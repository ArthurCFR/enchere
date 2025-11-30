-- Migration pour ajouter les champs Gains, Outils possibles et Risques potentiels

ALTER TABLE usages
ADD COLUMN IF NOT EXISTS gains TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tools TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS risks TEXT DEFAULT '';

-- Note: Exécutez ce script dans Supabase SQL Editor pour ajouter les nouveaux champs
