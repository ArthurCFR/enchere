-- Script pour vider toutes les tables de la base de données
-- À exécuter dans l'éditeur SQL de Supabase
-- ATTENTION: Cette opération est irréversible !

-- Vider la table group_points
TRUNCATE TABLE group_points CASCADE;

-- Vider la table stacks
TRUNCATE TABLE stacks CASCADE;

-- Vider la table usages
TRUNCATE TABLE usages CASCADE;

-- Message de confirmation
SELECT 'Toutes les tables ont été vidées avec succès' AS status;
