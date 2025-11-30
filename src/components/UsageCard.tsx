import { type Usage, getCategoryColor } from '../lib/supabase';

interface UsageCardProps {
  usage: Usage;
  isSelected: boolean;
  canAfford: boolean;
  onToggle: () => void;
}

const UsageCard = ({ usage, isSelected, canAfford, onToggle }: UsageCardProps) => {
  const colorClass = getCategoryColor(usage.category);
  const canAdd = !isSelected && canAfford;

  return (
    <div className={`card-neo ${colorClass} relative group`}>
      {/* Prix en haut à droite */}
      <div className="absolute -top-3 -right-3 bg-neo-black text-neo-yellow px-4 py-2 border-4 border-neo-black font-black text-xl">
        {usage.price} AI₿
      </div>

      {/* Description */}
      <p className="font-bold text-lg leading-tight pr-12 mb-4">
        {usage.description}
      </p>

      {/* Bouton d'ajout/retrait */}
      <div className="flex justify-end mt-4">
        {isSelected ? (
          <button
            onClick={onToggle}
            className="btn-neo bg-red-500 text-neo-white px-4 py-2 text-sm"
          >
            ✕ Retirer
          </button>
        ) : (
          <button
            onClick={onToggle}
            disabled={!canAdd}
            className={`btn-neo px-4 py-2 text-sm ${
              canAdd
                ? 'bg-neo-white text-neo-black hover:bg-neo-black hover:text-neo-white'
                : 'bg-gray-400 text-gray-600 opacity-50 cursor-not-allowed'
            }`}
          >
            + Ajouter
          </button>
        )}
      </div>

      {/* Indicateur de sélection */}
      {isSelected && (
        <div className="absolute -top-3 -left-3 bg-neo-white border-4 border-neo-black rounded-full w-10 h-10 flex items-center justify-center text-xl">
          ✓
        </div>
      )}
    </div>
  );
};

export default UsageCard;
