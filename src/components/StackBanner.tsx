import { type Usage, getCategoryColor } from '../lib/supabase';

interface StackBannerProps {
  selectedUsages: Usage[];
  onRemove: (usage: Usage) => void;
  onValidate: () => void;
}

const StackBanner = ({ selectedUsages, onRemove, onValidate }: StackBannerProps) => {
  const totalCost = selectedUsages.reduce((sum, usage) => sum + usage.price, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neo-white border-t-8 border-neo-black shadow-brutal-lg z-50">
      <div className="container-neo py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black uppercase">Ma Stack IA</h3>
              <div className="font-black text-lg">
                {selectedUsages.length} usage{selectedUsages.length > 1 ? 's' : ''} | {totalCost} AI₿
              </div>
            </div>

            {/* Usages sélectionnés (version compacte) */}
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {selectedUsages.length === 0 ? (
                <p className="text-sm font-bold opacity-50">
                  Aucun usage sélectionné. Cliquez sur + pour ajouter des usages.
                </p>
              ) : (
                selectedUsages.map(usage => (
                  <div
                    key={usage.id}
                    className={`${getCategoryColor(usage.category)} px-3 py-1 text-sm font-bold flex items-center gap-2`}
                  >
                    <span className="truncate max-w-[200px]">
                      {usage.description.substring(0, 40)}
                      {usage.description.length > 40 ? '...' : ''}
                    </span>
                    <span className="font-black">{usage.price}₿</span>
                    <button
                      onClick={() => onRemove(usage)}
                      className="ml-1 hover:text-red-600 font-black"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={onValidate}
            disabled={selectedUsages.length === 0}
            className={`btn-neo-success whitespace-nowrap ${
              selectedUsages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            ✓ Valider ma stack
          </button>
        </div>
      </div>
    </div>
  );
};

export default StackBanner;
