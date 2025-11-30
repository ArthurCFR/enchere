import { useNavigate } from 'react-router-dom';

const GroupSelection = () => {
  const navigate = useNavigate();

  const handleGroupSelection = (groupNumber: 1 | 2 | 3) => {
    navigate('/workspace', { state: { groupNumber } });
  };

  return (
    <div className="min-h-screen bg-neo-yellow flex items-center justify-center p-4">
      <div className="container-neo">
        <div className="text-center mb-12">
          <h1 className="title-neo bg-neo-white inline-block px-8">
            Atelier d'Idéation IA
          </h1>
          <p className="text-xl font-bold mt-6 uppercase tracking-wide">
            Sélectionnez votre groupe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Groupe 1 - Consultants Junior */}
          <button
            onClick={() => handleGroupSelection(1)}
            className="card-neo-hover bg-neo-green p-8 text-center group"
          >
            <div className="text-6xl mb-4 animate-float">👶</div>
            <h2 className="text-3xl font-black uppercase mb-2">Groupe 1</h2>
            <p className="text-lg font-bold">Consultants Junior</p>
            <div className="mt-6 text-sm font-bold opacity-70">
              Cliquez pour commencer
            </div>
          </button>

          {/* Groupe 2 - Consultants Senior */}
          <button
            onClick={() => handleGroupSelection(2)}
            className="card-neo-hover bg-neo-blue p-8 text-center group"
          >
            <div className="text-6xl mb-4 animate-float" style={{ animationDelay: '0.5s' }}>
              🎯
            </div>
            <h2 className="text-3xl font-black uppercase mb-2">Groupe 2</h2>
            <p className="text-lg font-bold">Consultants Senior</p>
            <div className="mt-6 text-sm font-bold opacity-70">
              Cliquez pour commencer
            </div>
          </button>

          {/* Groupe 3 - Managers */}
          <button
            onClick={() => handleGroupSelection(3)}
            className="card-neo-hover bg-neo-pink p-8 text-center group"
          >
            <div className="text-6xl mb-4 animate-float" style={{ animationDelay: '1s' }}>
              👔
            </div>
            <h2 className="text-3xl font-black uppercase mb-2">Groupe 3</h2>
            <p className="text-lg font-bold">Managers</p>
            <div className="mt-6 text-sm font-bold opacity-70">
              Cliquez pour commencer
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/admin"
            className="text-sm font-bold opacity-50 hover:opacity-100 transition-opacity"
          >
            Administration
          </a>
        </div>
      </div>
    </div>
  );
};

export default GroupSelection;
