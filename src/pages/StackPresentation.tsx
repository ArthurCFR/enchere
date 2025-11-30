import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type Usage, getCategoryColor, getGroupName } from '../lib/supabase';

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
      <div className="min-h-screen bg-neo-black flex items-center justify-center">
        <div className="text-3xl font-black uppercase text-neo-yellow">Chargement...</div>
      </div>
    );
  }

  if (stacks.length === 0) {
    return (
      <div className="min-h-screen bg-neo-black flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase text-neo-yellow mb-8">
            Aucune stack validée
          </h1>
          <p className="text-xl font-bold text-neo-white mb-8">
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
    <div className="min-h-screen bg-neo-black text-neo-white p-8">
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
        <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 text-neo-yellow border-b-8 border-neo-yellow inline-block pb-4 px-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categorized['quick-win'].map(usage => (
                <div
                  key={usage.id}
                  className={`${getCategoryColor(usage.category)} p-6 relative`}
                >
                  <div className="absolute -top-3 -right-3 bg-neo-black text-neo-yellow px-4 py-2 border-4 border-neo-yellow font-black text-xl">
                    {usage.price} AI₿
                  </div>
                  <p className="font-bold text-xl leading-tight pr-12">
                    {usage.description}
                  </p>
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categorized['structurant'].map(usage => (
                <div
                  key={usage.id}
                  className={`${getCategoryColor(usage.category)} p-6 relative`}
                >
                  <div className="absolute -top-3 -right-3 bg-neo-black text-neo-blue px-4 py-2 border-4 border-neo-blue font-black text-xl">
                    {usage.price} AI₿
                  </div>
                  <p className="font-bold text-xl leading-tight pr-12">
                    {usage.description}
                  </p>
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categorized['moonshot'].map(usage => (
                <div
                  key={usage.id}
                  className={`${getCategoryColor(usage.category)} p-6 relative`}
                >
                  <div className="absolute -top-3 -right-3 bg-neo-black text-neo-pink px-4 py-2 border-4 border-neo-pink font-black text-xl">
                    {usage.price} AI₿
                  </div>
                  <p className="font-bold text-xl leading-tight pr-12">
                    {usage.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-0 right-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
          <button
            onClick={goPrevious}
            disabled={currentStackIndex === 0}
            className={`btn-neo-secondary text-xl ${
              currentStackIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            ← Précédent
          </button>

          <button
            onClick={goNext}
            disabled={currentStackIndex === stacks.length - 1}
            className={`btn-neo-secondary text-xl ${
              currentStackIndex === stacks.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
};

export default StackPresentation;
