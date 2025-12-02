import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type Usage, getGroupName } from '../lib/supabase';
import UsageCard from '../components/UsageCard';
import UsageDetailModal from '../components/UsageDetailModal';

interface StackData {
  group_number: 1 | 2 | 3;
  usages: Usage[];
  total_spent: number;
}

const StackPresentation = () => {
  const navigate = useNavigate();
  const [stacks, setStacks] = useState<StackData[]>([]);
  const [currentStackIndex, setCurrentStackIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedUsageDetail, setSelectedUsageDetail] = useState<Usage | null>(null);

  useEffect(() => {
    fetchStacks();
  }, []);

  const fetchStacks = async () => {
    try {
      setLoading(true);

      // Récupérer toutes les stacks validées
      const { data: stacksData, error: stacksError } = await supabase
        .from('stacks')
        .select('*')
        .eq('validated', true)
        .order('group_number', { ascending: true });

      if (stacksError) throw stacksError;

      // Récupérer tous les usages
      const { data: usagesData, error: usagesError } = await supabase
        .from('usages')
        .select('*');

      if (usagesError) throw usagesError;

      // Construire les stacks avec leurs usages
      const stacksWithUsages: StackData[] = stacksData.map(stack => ({
        group_number: stack.group_number,
        usages: (stack.usage_ids || [])
          .map((id: string) => usagesData.find(u => u.id === id))
          .filter((u: Usage | undefined) => u !== undefined) as Usage[],
        total_spent: stack.total_spent
      }));

      setStacks(stacksWithUsages);
    } catch (error) {
      console.error('Erreur lors du chargement des stacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentStack = stacks[currentStackIndex];

  const goNext = () => {
    if (currentStackIndex < stacks.length - 1) {
      setCurrentStackIndex(currentStackIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentStackIndex > 0) {
      setCurrentStackIndex(currentStackIndex - 1);
    }
  };

  const categorizeUsages = (usages: Usage[]) => {
    return {
      'quick-win': usages.filter(u => u.category === 'quick-win'),
      'structurant': usages.filter(u => u.category === 'structurant'),
      'moonshot': usages.filter(u => u.category === 'moonshot')
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neo-yellow flex items-center justify-center">
        <div className="text-3xl font-black uppercase text-neo-black">Chargement...</div>
      </div>
    );
  }

  if (stacks.length === 0) {
    return (
      <div className="min-h-screen bg-neo-yellow flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase text-neo-black mb-8">
            Aucune stack validée
          </h1>
          <p className="text-xl font-bold text-neo-black mb-8">
            Les groupes doivent d'abord valider leurs stacks
          </p>
          <button
            onClick={() => navigate('/admin')}
            className="btn-neo-white"
          >
            Retour à l'admin
          </button>
        </div>
      </div>
    );
  }

  const categorized = categorizeUsages(currentStack.usages);

  return (
    <div className="min-h-screen bg-neo-yellow text-neo-black p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/admin')}
            className="btn-neo-white text-sm"
          >
            ← Admin
          </button>
          <div className="text-xl font-black">
            Stack {currentStackIndex + 1} / {stacks.length}
          </div>
        </div>
      </div>

      {/* Titre de la stack */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 text-neo-black border-b-8 border-neo-black inline-block pb-4 px-8">
          Stack IA pour les {getGroupName(currentStack.group_number)}
        </h1>
        <div className="text-3xl font-black mt-8">
          <span className="text-neo-pink">{currentStack.usages.length} usages</span>
          {' • '}
          <span className="text-neo-blue">{currentStack.total_spent} AI₿ dépensés</span>
        </div>
      </div>

      {/* Usages par catégorie */}
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Quick Wins */}
        {categorized['quick-win'].length > 0 && (
          <section>
            <h2 className="text-4xl font-black uppercase mb-6 text-neo-green">
              ⚡ Quick Wins
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorized['quick-win'].map(usage => (
                <UsageCard
                  key={usage.id}
                  usage={usage}
                  isSelected={true}
                  canAfford={true}
                  onToggle={() => {}}
                  onClick={() => setSelectedUsageDetail(usage)}
                  presentationMode={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Structurants */}
        {categorized['structurant'].length > 0 && (
          <section>
            <h2 className="text-4xl font-black uppercase mb-6 text-neo-blue">
              🏗️ Structurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorized['structurant'].map(usage => (
                <UsageCard
                  key={usage.id}
                  usage={usage}
                  isSelected={true}
                  canAfford={true}
                  onToggle={() => {}}
                  onClick={() => setSelectedUsageDetail(usage)}
                  presentationMode={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Moonshots */}
        {categorized['moonshot'].length > 0 && (
          <section>
            <h2 className="text-4xl font-black uppercase mb-6 text-neo-pink">
              🚀 Moonshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorized['moonshot'].map(usage => (
                <UsageCard
                  key={usage.id}
                  usage={usage}
                  isSelected={true}
                  canAfford={true}
                  onToggle={() => {}}
                  onClick={() => setSelectedUsageDetail(usage)}
                  presentationMode={true}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Navigation - Boutons fixes sur les côtés */}
      <button
        onClick={goPrevious}
        disabled={currentStackIndex === 0}
        className={`fixed left-4 top-1/2 -translate-y-1/2 btn-neo-secondary text-xl z-50 ${
          currentStackIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
        }`}
      >
        ←
      </button>

      <button
        onClick={goNext}
        disabled={currentStackIndex === stacks.length - 1}
        className={`fixed right-4 top-1/2 -translate-y-1/2 btn-neo-secondary text-xl z-50 ${
          currentStackIndex === stacks.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
        }`}
      >
        →
      </button>

      {/* Modal de détail d'usage */}
      <UsageDetailModal
        usage={selectedUsageDetail}
        isOpen={!!selectedUsageDetail}
        onClose={() => setSelectedUsageDetail(null)}
      />
    </div>
  );
};

export default StackPresentation;
