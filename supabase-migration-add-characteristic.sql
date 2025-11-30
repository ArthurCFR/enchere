-- Migration pour ajouter le champ characteristic à la table usages
-- À exécuter dans l'éditeur SQL de Supabase

ALTER TABLE usages
ADD COLUMN IF NOT EXISTS characteristic TEXT CHECK (characteristic IN ('cabinet', 'offres', 'mission'));

-- Ajouter un commentaire pour documenter la colonne
COMMENT ON COLUMN usages.characteristic IS 'Caractéristique de l''usage: cabinet, offres ou mission';
