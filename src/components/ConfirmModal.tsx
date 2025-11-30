interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({ isOpen, title, message, onConfirm, onClose }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="card-neo bg-neo-yellow max-w-md w-full transform animate-slideUp">
        <h2 className="text-3xl font-black uppercase mb-4 border-b-4 border-neo-black pb-2">
          {title}
        </h2>
        <p className="text-lg font-bold mb-6">
          {message}
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="btn-neo bg-gray-300 text-neo-black"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn-neo-success"
          >
            ✓ Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
