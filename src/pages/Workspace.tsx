import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase, type Usage, getGroupInstruction, getCategoryColor } from '../lib/supabase';
import UsageCard from '../components/UsageCard';
import ConfirmModal from '../components/ConfirmModal';
import UsageDetailModal from '../components/UsageDetailModal';
import SuccessMessage from '../components/SuccessMessage';

const Workspace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const groupNumber = location.state?.groupNumber as 1 | 2 | 3;

  const [usages, setUsages] = useState<Usage[]>([]);
  const [selectedUsageIds, setSelectedUsageIds] = useState<string[]>([]);
  const [budget, setBudget] = useState(200);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUsageDetail, setSelectedUsageDetail] = useState<Usage | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!groupNumber) {
      navigate('/');
      return;
    }
    fetchUsages();
    fetchExistingStack();
  }, [groupNumber]);

  const fetchUsages = async () => {
    try {
      const { data, error } = await supabase
        .from('usages')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setUsages(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des usages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExistingStack = async () => {
    try {
      const { data, error } = await supabase
        .from('stacks')
        .select('*')
        .eq('group_number', groupNumber)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSelectedUsageIds(data.usage_ids || []);
        setBudget(200 - data.total_spent);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la stack:', error);
    }
  };

  const toggleUsage = async (usage: Usage) => {
    const isSelected = selectedUsageIds.includes(usage.id!);

    if (isSelected) {
      const newSelectedIds = selectedUsageIds.filter(id => id !== usage.id);
      const newBudget = budget + usage.price;

      setSelectedUsageIds(newSelectedIds);
      setBudget(newBudget);

      await updateStack(newSelectedIds, 200 - newBudget);
    } else {
      if (budget >= usage.price) {
        const newSelectedIds = [...selectedUsageIds, usage.id!];
        const newBudget = budget - usage.price;

        setSelectedUsageIds(newSelectedIds);
        setBudget(newBudget);

        await updateStack(newSelectedIds, 200 - newBudget);
      }
    }
  };

  const updateStack = async (usageIds: string[], totalSpent: number) => {
    try {
      const { error } = await supabase
        .from('stacks')
        .upsert({
          group_number: groupNumber,
          usage_ids: usageIds,
          total_spent: totalSpent,
          validated: false
        }, {
          onConflict: 'group_number'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la stack:', error);
    }
  };

  const validateStack = async () => {
    try {
      const { error } = await supabase
        .from('stacks')
        .update({ validated: true })
        .eq('group_number', groupNumber);

      if (error) throw error;

      // Afficher le message de succès
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
    }
  };

  const categorizeUsages = () => {
    return {
      'quick-win': usages.filter(u => u.category === 'quick-win'),
      'structurant': usages.filter(u => u.category === 'structurant'),
      'moonshot': usages.filter(u => u.category === 'moonshot')
    };
  };

  const removeUsage = (usage: Usage) => {
    toggleUsage(usage);
  };

  if (!groupNumber) return null;
  if (loading) {
    return (
      <div className="min-h-screen bg-neo-yellow flex items-center justify-center">
        <div className="text-3xl font-black uppercase">Chargement...</div>
      </div>
    );
  }

  const categorized = categorizeUsages();
  const selectedUsages = usages.filter(u => selectedUsageIds.includes(u.id!));
  const totalCost = selectedUsages.reduce((sum, usage) => sum + usage.price, 0);

  return (
    <div className="min-h-screen bg-neo-yellow">
      {/* Header compact avec consigne, budget et usages sélectionnés */}
      <div className="bg-neo-purple border-b-8 border-neo-black sticky top-0 z-40">
        <div className="container-neo py-4">
          {/* Ligne 1: Consigne et Budget */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg md:text-xl font-black uppercase">
              {getGroupInstruction(groupNumber)}
            </h2>
            <div className="card-neo bg-neo-white px-4 py-2 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <div className="text-right">
                <div className="text-xs font-bold opacity-70">Budget</div>
                <div className="text-2xl font-black">{budget} AI₿</div>
              </div>
            </div>
          </div>

          {/* Ligne 2: Usages sélectionnés */}
          {selectedUsages.length > 0 && (
            <div className="bg-neo-white border-4 border-neo-black p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-black uppercase">Ma Stack ({selectedUsages.length} usages | {totalCost} AI₿)</h3>
                <button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={selectedUsages.length === 0}
                  className="btn-neo bg-neo-green text-neo-black px-4 py-1 text-sm"
                >
                  ✓ Valider
                </button>
              </div>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                {selectedUsages.map(usage => (
                  <div
                    key={usage.id}
                    className={`${getCategoryColor(usage.category)} px-2 py-1 text-xs font-bold flex items-center gap-2`}
                  >
                    <span className="truncate max-w-[150px]">
                      {usage.description.substring(0, 30)}
                      {usage.description.length > 30 ? '...' : ''}
                    </span>
                    <span className="font-black">{usage.price}₿</span>
                    <button
                      onClick={() => removeUsage(usage)}
                      className="hover:text-red-600 font-black"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Liste des usages par catégorie */}
      <div className="container-neo mt-8">
        {/* Quick Wins */}
        <section className="mb-12">
          <h3 className="subtitle-neo bg-neo-green inline-block px-6 py-2 mb-6">
            ⚡ Quick Wins (10 AI₿)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorized['quick-win'].map(usage => (
              <UsageCard
                key={usage.id}
                usage={usage}
                isSelected={selectedUsageIds.includes(usage.id!)}
                canAfford={budget >= usage.price}
                onToggle={() => toggleUsage(usage)}
                onClick={() => setSelectedUsageDetail(usage)}
              />
            ))}
          </div>
          {categorized['quick-win'].length === 0 && (
            <p className="text-lg font-bold opacity-50">Aucun usage dans cette catégorie</p>
          )}
        </section>

        {/* Structurants */}
        <section className="mb-12">
          <h3 className="subtitle-neo bg-neo-blue inline-block px-6 py-2 mb-6">
            🏗️ Structurants (20 AI₿)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorized['structurant'].map(usage => (
              <UsageCard
                key={usage.id}
                usage={usage}
                isSelected={selectedUsageIds.includes(usage.id!)}
                canAfford={budget >= usage.price}
                onToggle={() => toggleUsage(usage)}
                onClick={() => setSelectedUsageDetail(usage)}
              />
            ))}
          </div>
          {categorized['structurant'].length === 0 && (
            <p className="text-lg font-bold opacity-50">Aucun usage dans cette catégorie</p>
          )}
        </section>

        {/* Moonshots */}
        <section className="mb-12">
          <h3 className="subtitle-neo bg-neo-pink inline-block px-6 py-2 mb-6">
            🚀 Moonshots (50 AI₿)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorized['moonshot'].map(usage => (
              <UsageCard
                key={usage.id}
                usage={usage}
                isSelected={selectedUsageIds.includes(usage.id!)}
                canAfford={budget >= usage.price}
                onToggle={() => toggleUsage(usage)}
                onClick={() => setSelectedUsageDetail(usage)}
              />
            ))}
          </div>
          {categorized['moonshot'].length === 0 && (
            <p className="text-lg font-bold opacity-50">Aucun usage dans cette catégorie</p>
          )}
        </section>
      </div>

      {/* Modal de confirmation */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Valider votre stack ?"
        message={`Vous êtes sur le point de valider votre stack avec ${selectedUsages.length} usage(s) pour un total de ${totalCost} AIBitcoins. Cette action est définitive !`}
        onConfirm={validateStack}
        onClose={() => setShowConfirmModal(false)}
      />

      {/* Modal de détail d'usage */}
      <UsageDetailModal
        usage={selectedUsageDetail}
        isOpen={!!selectedUsageDetail}
        onClose={() => setSelectedUsageDetail(null)}
      />

      {/* Message de succès */}
      <SuccessMessage
        message="Stack validée !"
        isVisible={showSuccessMessage}
      />
    </div>
  );
};

export default Workspace;
