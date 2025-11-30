import { useState } from 'react';
import { type Usage } from '../lib/supabase';

interface UsageEditorProps {
  usage: Usage;
  onSave: (usage: Usage) => void;
  onClose: () => void;
}

const UsageEditor = ({ usage, onSave, onClose }: UsageEditorProps) => {
  const [formData, setFormData] = useState<Usage>(usage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card-neo bg-neo-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-black uppercase mb-6">
          {usage.id ? 'Modifier l\'usage' : 'Nouvel usage'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Description */}
          <div className="mb-6">
            <label className="block font-bold text-lg mb-2">
              Description de l'usage
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="textarea-neo"
              placeholder="Décrivez l'usage..."
              required
            />
          </div>

          {/* Catégorie */}
          <div className="mb-6">
            <label className="block font-bold text-lg mb-2">
              Catégorie
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: 'quick-win', price: 10 })}
                className={`card-neo p-4 text-center ${
                  formData.category === 'quick-win'
                    ? 'bg-neo-green ring-4 ring-neo-black'
                    : 'bg-gray-200'
                }`}
              >
                <div className="font-black text-xl mb-2">Quick Win</div>
                <div className="text-sm font-bold">10 AI₿</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: 'structurant', price: 20 })}
                className={`card-neo p-4 text-center ${
                  formData.category === 'structurant'
                    ? 'bg-neo-blue ring-4 ring-neo-black'
                    : 'bg-gray-200'
                }`}
              >
                <div className="font-black text-xl mb-2">Structurant</div>
                <div className="text-sm font-bold">20 AI₿</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: 'moonshot', price: 50 })}
                className={`card-neo p-4 text-center ${
                  formData.category === 'moonshot'
                    ? 'bg-neo-pink ring-4 ring-neo-black'
                    : 'bg-gray-200'
                }`}
              >
                <div className="font-black text-xl mb-2">Moonshot</div>
                <div className="text-sm font-bold">50 AI₿</div>
              </button>
            </div>
          </div>

          {/* Groupe (seulement pour les nouveaux usages) */}
          {!usage.id && (
            <div className="mb-6">
              <label className="block font-bold text-lg mb-2">
                Groupe
              </label>
              <select
                value={formData.group_number}
                onChange={(e) => setFormData({ ...formData, group_number: parseInt(e.target.value) as 1 | 2 | 3 })}
                className="input-neo"
                required
              >
                <option value={1}>Groupe 1 - Consultants Junior</option>
                <option value={2}>Groupe 2 - Consultants Senior</option>
                <option value={3}>Groupe 3 - Managers</option>
              </select>
            </div>
          )}

          {/* Boutons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn-neo bg-gray-300 text-neo-black"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-neo-success"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsageEditor;
