import { useState } from 'react';
import { supabase, getCategoryPrice } from '../lib/supabase';

interface JsonImporterProps {
  groupNumber: 1 | 2 | 3;
  onComplete: () => void;
  onClose: () => void;
}

interface UsageJson {
  description: string;
  category: 'quick-win' | 'structurant' | 'moonshot';
}

const JsonImporter = ({ groupNumber, onComplete, onClose }: JsonImporterProps) => {
  const [jsonText, setJsonText] = useState('');
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    try {
      setImporting(true);

      // Parser le JSON
      const usages: UsageJson[] = JSON.parse(jsonText);

      if (!Array.isArray(usages)) {
        throw new Error('Le JSON doit être un tableau d\'usages');
      }

      // Valider la structure
      for (const usage of usages) {
        if (!usage.description || !usage.category) {
          throw new Error('Chaque usage doit avoir une description et une catégorie');
        }
        if (!['quick-win', 'structurant', 'moonshot'].includes(usage.category)) {
          throw new Error('Catégorie invalide. Utilisez: quick-win, structurant, ou moonshot');
        }
      }

      // Préparer les données pour l'insertion
      const usagesToInsert = usages.map(usage => ({
        description: usage.description,
        category: usage.category,
        group_number: groupNumber,
        price: getCategoryPrice(usage.category)
      }));

      // Insérer dans Supabase
      const { error } = await supabase
        .from('usages')
        .insert(usagesToInsert);

      if (error) throw error;

      alert(`${usages.length} usage(s) importé(s) avec succès pour le groupe ${groupNumber} !`);
      onComplete();
    } catch (error: any) {
      console.error('Erreur lors de l\'import:', error);
      alert(`Erreur: ${error.message || 'Format JSON invalide'}`);
    } finally {
      setImporting(false);
    }
  };

  const exampleJson = `[
  {
    "description": "Automatiser la génération de rapports",
    "category": "quick-win"
  },
  {
    "description": "Créer un assistant IA pour les réunions",
    "category": "structurant"
  },
  {
    "description": "Développer une IA prédictive complète",
    "category": "moonshot"
  }
]`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card-neo bg-neo-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-black uppercase mb-4">
          Import JSON - Groupe {groupNumber}
        </h2>

        <div className="mb-6">
          <p className="font-bold mb-2">
            Format attendu: tableau d'objets avec "description" et "category"
          </p>
          <p className="text-sm font-bold opacity-70 mb-4">
            Catégories possibles: "quick-win", "structurant", "moonshot"
          </p>

          {/* Exemple */}
          <details className="card-neo bg-neo-yellow p-4 mb-4">
            <summary className="font-black cursor-pointer">
              Voir un exemple de JSON
            </summary>
            <pre className="mt-4 p-4 bg-neo-black text-neo-green font-mono text-sm overflow-x-auto">
              {exampleJson}
            </pre>
          </details>

          {/* Zone de texte */}
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="textarea-neo min-h-[300px] font-mono text-sm"
            placeholder="Collez votre JSON ici..."
          />
        </div>

        {/* Boutons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-neo bg-gray-300 text-neo-black"
            disabled={importing}
          >
            Annuler
          </button>
          <button
            onClick={handleImport}
            className="btn-neo-success"
            disabled={importing || !jsonText.trim()}
          >
            {importing ? 'Import en cours...' : 'Importer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JsonImporter;
