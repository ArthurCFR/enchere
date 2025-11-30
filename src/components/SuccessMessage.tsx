interface SuccessMessageProps {
  message: string;
  isVisible: boolean;
}

const SuccessMessage = ({ message, isVisible }: SuccessMessageProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
      <div className="card-neo bg-neo-green px-8 py-4 flex items-center gap-3">
        <span className="text-3xl">✓</span>
        <p className="text-xl font-black uppercase">{message}</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
