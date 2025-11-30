-- Table des usages
CREATE TABLE IF NOT EXISTS usages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('quick-win', 'structurant', 'moonshot')),
  group_number INTEGER NOT NULL CHECK (group_number IN (1, 2, 3)),
  price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des stacks
CREATE TABLE IF NOT EXISTS stacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_number INTEGER UNIQUE NOT NULL CHECK (group_number IN (1, 2, 3)),
  usage_ids UUID[] DEFAULT '{}',
  total_spent INTEGER DEFAULT 0,
  validated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des points par groupe
CREATE TABLE IF NOT EXISTS group_points (
  group_number INTEGER PRIMARY KEY CHECK (group_number IN (1, 2, 3)),
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour stacks
DROP TRIGGER IF EXISTS update_stacks_updated_at ON stacks;
CREATE TRIGGER update_stacks_updated_at
  BEFORE UPDATE ON stacks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour group_points
DROP TRIGGER IF EXISTS update_group_points_updated_at ON group_points;
CREATE TRIGGER update_group_points_updated_at
  BEFORE UPDATE ON group_points
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Initialiser les 3 groupes dans stacks et group_points
INSERT INTO stacks (group_number, usage_ids, total_spent, validated)
VALUES (1, '{}', 0, false), (2, '{}', 0, false), (3, '{}', 0, false)
ON CONFLICT (group_number) DO NOTHING;

INSERT INTO group_points (group_number, total_points)
VALUES (1, 0), (2, 0), (3, 0)
ON CONFLICT (group_number) DO NOTHING;

-- Enable Row Level Security (optionnel mais recommandé)
ALTER TABLE usages ENABLE ROW LEVEL SECURITY;
ALTER TABLE stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_points ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre toutes les opérations (à ajuster selon vos besoins de sécurité)
CREATE POLICY "Enable all operations for all users" ON usages
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for all users" ON stacks
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for all users" ON group_points
  FOR ALL USING (true) WITH CHECK (true);
