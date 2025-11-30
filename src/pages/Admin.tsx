import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type Usage, getCategoryPrice } from '../lib/supabase';
import UsageEditor from '../components/UsageEditor';
import JsonImporter from '../components/JsonImporter';

const Admin = () => {
  const navigate = useNavigate();
  const [usages, setUsages] = useState<Usage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUsage, setEditingUsage] = useState<Usage | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImporter, setShowImporter] = useState<1 | 2 | 3 | null>(null);

  useEffect(() => {
    fetchUsages();
  }, []);

  const fetchUsages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('usages')
        .select('*')
        .order('group_number', { ascending: true })
        .order('category', { ascending: true });

      if (error) throw error;
      setUsages(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des usages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet usage ?')) return;

    try {
      const { error } = await supabase
        .from('usages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchUsages();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleSave = async (usage: Usage) => {
    try {
      if (usage.id) {
        // Mise à jour
        const { error } = await supabase
          .from('usages')
          .update({
            description: usage.description,
            category: usage.category,
            characteristic: usage.characteristic || null,
            price: getCategoryPrice(usage.category),
            gains: usage.gains || '',
            tools: usage.tools || '',
            risks: usage.risks || '',
          })
          .eq('id', usage.id);

        if (error) throw error;
      } else {
        // Création
        const { error } = await supabase
          .from('usages')
          .insert({
            description: usage.description,
            category: usage.category,
            characteristic: usage.characteristic || null,
            group_number: usage.group_number,
            price: getCategoryPrice(usage.category),
            gains: usage.gains || '',
            tools: usage.tools || '',
            risks: usage.risks || '',
          });

        if (error) throw error;
      }

      await fetchUsages();
      setEditingUsage(null);
      setShowAddModal(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleImportComplete = async () => {
    await fetchUsages();
    setShowImporter(null);
  };

  const groupUsages = (groupNum: 1 | 2 | 3) => {
    return usages.filter(u => u.group_number === groupNum);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neo-purple flex items-center justify-center">
        <div className="text-3xl font-black uppercase text-neo-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neo-purple">
      <div className="container-neo">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="title-neo bg-neo-white">Administration</h1>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate('/admin/presentation')}
              className="btn-neo-secondary"
            >
              📊 Présentation Stacks
            </button>
            <button
              onClick={() => navigate('/admin/podium')}
              className="btn-neo-primary"
            >
              🏆 Podium Final
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-neo-white"
            >
              ← Retour
            </button>
          </div>
        </div>

        {/* Import JSON */}
        <div className="card-neo bg-neo-white mb-8">
          <h2 className="text-2xl font-black uppercase mb-4">Import JSON par Groupe</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setShowImporter(1)}
              className="btn-neo-success"
            >
              Import Groupe 1
            </button>
            <button
              onClick={() => setShowImporter(2)}
              className="btn-neo-success"
            >
              Import Groupe 2
            </button>
            <button
              onClick={() => setShowImporter(3)}
              className="btn-neo-success"
            >
              Import Groupe 3
            </button>
          </div>
        </div>

        {/* Liste des usages par groupe */}
        {[1, 2, 3].map(groupNum => (
          <div key={groupNum} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="subtitle-neo bg-neo-yellow inline-block px-6 py-2">
                Groupe {groupNum} ({groupUsages(groupNum as 1 | 2 | 3).length} usages)
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(true);
                  setEditingUsage({
                    description: '',
                    category: 'quick-win',
                    group_number: groupNum as 1 | 2 | 3,
                    price: 10
                  });
                }}
                className="btn-neo-primary"
              >
                + Nouvel usage
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {groupUsages(groupNum as 1 | 2 | 3).map(usage => (
                <div
                  key={usage.id}
                  className="card-neo bg-neo-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`badge-neo ${
                        usage.category === 'quick-win' ? 'bg-neo-green' :
                        usage.category === 'structurant' ? 'bg-neo-blue' :
                        'bg-neo-pink'
                      }`}>
                        {usage.category}
                      </span>
                      <span className="font-black text-lg">{usage.price} AI₿</span>
                    </div>
                    <p className="font-bold text-lg">{usage.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingUsage(usage)}
                      className="btn-neo bg-neo-blue text-neo-black px-4 py-2 text-sm"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(usage.id!)}
                      className="btn-neo bg-red-500 text-neo-white px-4 py-2 text-sm"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
              {groupUsages(groupNum as 1 | 2 | 3).length === 0 && (
                <p className="text-center text-lg font-bold opacity-50 text-neo-white py-8">
                  Aucun usage pour ce groupe
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'édition/création */}
      {(editingUsage || showAddModal) && (
        <UsageEditor
          usage={editingUsage!}
          onSave={handleSave}
          onClose={() => {
            setEditingUsage(null);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Modal d'import JSON */}
      {showImporter && (
        <JsonImporter
          groupNumber={showImporter}
          onComplete={handleImportComplete}
          onClose={() => setShowImporter(null)}
        />
      )}
    </div>
  );
};

export default Admin;
