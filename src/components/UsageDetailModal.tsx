import { type Usage, getCategoryColor } from '../lib/supabase';

interface UsageDetailModalProps {
  usage: Usage | null;
  isOpen: boolean;
  onClose: () => void;
}

const UsageDetailModal = ({ usage, isOpen, onClose }: UsageDetailModalProps) => {
  if (!isOpen || !usage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
      <div
        className={`card-neo ${getCategoryColor(usage.category)} max-w-3xl w-full max-h-[90vh] overflow-y-auto transform animate-slideUp`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="badge-neo bg-neo-white uppercase text-sm">
                {usage.category}
              </span>
              <span className="font-black text-2xl">{usage.price} AI₿</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              {usage.description}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn-neo bg-neo-black text-neo-white px-4 py-2 ml-4"
          >
            ✕
          </button>
        </div>

        {/* Détails */}
        <div className="space-y-4">
          {/* Gains */}
          {usage.gains && (
            <div className="bg-neo-white border-4 border-neo-black p-4">
              <h3 className="text-lg font-black uppercase mb-2 flex items-center gap-2">
                <span>📈</span> Gains
              </h3>
              <p className="font-bold leading-relaxed whitespace-pre-wrap">
                {usage.gains}
              </p>
            </div>
          )}

          {/* Outils possibles */}
          {usage.tools && (
            <div className="bg-neo-white border-4 border-neo-black p-4">
              <h3 className="text-lg font-black uppercase mb-2 flex items-center gap-2">
                <span>🛠️</span> Outils possibles
              </h3>
              <p className="font-bold leading-relaxed whitespace-pre-wrap">
                {usage.tools}
              </p>
            </div>
          )}

          {/* Risques potentiels */}
          {usage.risks && (
            <div className="bg-neo-white border-4 border-neo-black p-4">
              <h3 className="text-lg font-black uppercase mb-2 flex items-center gap-2">
                <span>⚠️</span> Risques potentiels
              </h3>
              <p className="font-bold leading-relaxed whitespace-pre-wrap">
                {usage.risks}
              </p>
            </div>
          )}

          {!usage.gains && !usage.tools && !usage.risks && (
            <p className="text-center text-lg font-bold opacity-50 py-8">
              Aucune information complémentaire disponible
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsageDetailModal;
