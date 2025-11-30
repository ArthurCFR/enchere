import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase, type Usage, getGroupInstruction } from '../lib/supabase';
import UsageCard from '../components/UsageCard';
import StackBanner from '../components/StackBanner';

const Workspace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const groupNumber = location.state?.groupNumber as 1 | 2 | 3;

  const [usages, setUsages] = useState<Usage[]>([]);
  const [selectedUsageIds, setSelectedUsageIds] = useState<string[]>([]);
  const [budget, setBudget] = useState(200);
  const [loading, setLoading] = useState(true);

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
      // Retirer l'usage
      const newSelectedIds = selectedUsageIds.filter(id => id !== usage.id);
      const newBudget = budget + usage.price;

      setSelectedUsageIds(newSelectedIds);
      setBudget(newBudget);

      await updateStack(newSelectedIds, 200 - newBudget);
    } else {
      // Ajouter l'usage si le budget le permet
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

      alert('Stack validée avec succès ! 🎉');
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      alert('Erreur lors de la validation de la stack');
    }
  };

  const categorizeUsages = () => {
    return {
      'quick-win': usages.filter(u => u.category === 'quick-win'),
      'structurant': usages.filter(u => u.category === 'structurant'),
      'moonshot': usages.filter(u => u.category === 'moonshot')
    };
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

  return (
    <div className="min-h-screen bg-neo-yellow pb-32">
      {/* Header avec consigne et budget */}
      <div className="bg-neo-purple border-b-8 border-neo-black py-6 sticky top-0 z-40">
        <div className="container-neo">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase text-center md:text-left">
              {getGroupInstruction(groupNumber)}
            </h2>
            <div className="card-neo bg-neo-white px-6 py-3 flex items-center gap-3">
              <span className="text-3xl">💰</span>
              <div className="text-right">
                <div className="text-sm font-bold opacity-70">Budget restant</div>
                <div className="text-3xl font-black">{budget} AI₿</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière de la stack sélectionnée */}
      <StackBanner
        selectedUsages={selectedUsages}
        onRemove={toggleUsage}
        onValidate={validateStack}
      />

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
              />
            ))}
          </div>
          {categorized['moonshot'].length === 0 && (
            <p className="text-lg font-bold opacity-50">Aucun usage dans cette catégorie</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Workspace;
