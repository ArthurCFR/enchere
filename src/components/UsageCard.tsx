import { type Usage, getCategoryColor } from '../lib/supabase';

interface UsageCardProps {
  usage: Usage;
  isSelected: boolean;
  canAfford: boolean;
  onToggle: () => void;
  onClick: () => void;
}

const UsageCard = ({ usage, isSelected, canAfford, onToggle, onClick }: UsageCardProps) => {
  const colorClass = getCategoryColor(usage.category);
  const canAdd = !isSelected && canAfford;

  const hasDetails = usage.gains || usage.tools || usage.risks;

  return (
    <div className={`card-neo ${colorClass} relative group`}>
      {/* Prix en haut à droite */}
      <div className="absolute -top-3 -right-3 bg-neo-black text-neo-yellow px-4 py-2 border-4 border-neo-black font-black text-xl">
        {usage.price} AI₿
      </div>

      {/* Caractéristique en bas à gauche */}
      {usage.characteristic && (
        <div className="absolute -bottom-3 -left-3 bg-neo-purple text-neo-white px-3 py-1 border-4 border-neo-black font-black text-sm uppercase">
          {usage.characteristic}
        </div>
      )}

      {/* Zone cliquable pour voir les détails */}
      <div
        onClick={onClick}
        className={`${hasDetails ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} mb-4`}
      >
        {/* Description */}
        <p className="font-bold text-lg leading-tight pr-12 mb-3">
          {usage.description}
        </p>

        {/* Aperçu des détails (cropés) */}
        {hasDetails && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {/* Gains */}
            {usage.gains && (
              <div className="bg-neo-white bg-opacity-50 border-2 border-neo-black p-2">
                <div className="text-xs font-black uppercase mb-1">📈 Gains</div>
                <p className="text-xs font-bold line-clamp-2">
                  {usage.gains}
                </p>
              </div>
            )}

            {/* Outils */}
            {usage.tools && (
              <div className="bg-neo-white bg-opacity-50 border-2 border-neo-black p-2">
                <div className="text-xs font-black uppercase mb-1">🛠️ Outils</div>
                <p className="text-xs font-bold line-clamp-2">
                  {usage.tools}
                </p>
              </div>
            )}

            {/* Risques */}
            {usage.risks && (
              <div className="bg-neo-white bg-opacity-50 border-2 border-neo-black p-2">
                <div className="text-xs font-black uppercase mb-1">⚠️ Risques</div>
                <p className="text-xs font-bold line-clamp-2">
                  {usage.risks}
                </p>
              </div>
            )}
          </div>
        )}

        {hasDetails && (
          <p className="text-xs font-bold opacity-70 mt-2 text-center">
            Cliquez pour voir plus de détails
          </p>
        )}
      </div>

      {/* Boutons d'ajout/retrait */}
      <div className="flex justify-end mt-4" onClick={(e) => e.stopPropagation()}>
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
        <div className="absolute -top-3 -left-3 bg-neo-white border-4 border-neo-black rounded-full w-10 h-10 flex items-center justify-center text-xl z-10">
          ✓
        </div>
      )}
    </div>
  );
};

export default UsageCard;
