import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, getGroupName } from '../lib/supabase';

interface GroupScore {
  group_number: 1 | 2 | 3;
  points: number;
  groupName: string;
}

const Podium = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<GroupScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculatePoints();
  }, []);

  const calculatePoints = async () => {
    try {
      setLoading(true);

      // Récupérer toutes les stacks validées
      const { data: stacksData, error: stacksError } = await supabase
        .from('stacks')
        .select('*');

      if (stacksError) throw stacksError;

      // Récupérer tous les usages
      const { data: usagesData, error: usagesError } = await supabase
        .from('usages')
        .select('*');

      if (usagesError) throw usagesError;

      // Calculer les points pour chaque groupe
      const groupPoints: { [key: number]: number } = { 1: 0, 2: 0, 3: 0 };

      // Pour chaque usage, compter combien de fois il est sélectionné
      usagesData.forEach(usage => {
        let selectionCount = 0;

        // Compter combien de groupes ont sélectionné cet usage
        stacksData.forEach(stack => {
          if ((stack.usage_ids || []).includes(usage.id)) {
            selectionCount++;
          }
        });

        // Attribuer les points au groupe créateur (prix × nombre de sélections)
        if (selectionCount > 0) {
          groupPoints[usage.group_number] += usage.price * selectionCount;
        }
      });

      // Créer le tableau de scores
      const scoresArray: GroupScore[] = [
        {
          group_number: 1,
          points: groupPoints[1],
          groupName: getGroupName(1)
        },
        {
          group_number: 2,
          points: groupPoints[2],
          groupName: getGroupName(2)
        },
        {
          group_number: 3,
          points: groupPoints[3],
          groupName: getGroupName(3)
        }
      ];

      // Trier par points décroissants
      scoresArray.sort((a, b) => b.points - a.points);

      setScores(scoresArray);

      // Mettre à jour la table group_points
      for (const score of scoresArray) {
        await supabase
          .from('group_points')
          .upsert({
            group_number: score.group_number,
            total_points: score.points
          }, {
            onConflict: 'group_number'
          });
      }
    } catch (error) {
      console.error('Erreur lors du calcul des points:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neo-purple flex items-center justify-center">
        <div className="text-3xl font-black uppercase text-neo-white">
          Calcul des scores...
        </div>
      </div>
    );
  }

  const [first, second, third] = scores;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neo-purple via-neo-pink to-neo-blue p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => navigate('/admin')}
            className="btn-neo-white text-sm"
          >
            ← Retour Admin
          </button>
        </div>

        {/* Titre */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-4 text-neo-white animate-float" style={{
            textShadow: '8px 8px 0px rgba(0,0,0,1)',
          }}>
            🏆 Podium Final 🏆
          </h1>
          <p className="text-2xl font-bold text-neo-white">
            Classement des groupes par points récoltés
          </p>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-8 mb-16">
          {/* 2ème place */}
          {second && (
            <div className="flex flex-col items-center animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="card-neo bg-neo-blue p-8 text-center mb-4" style={{ width: '250px' }}>
                <div className="text-7xl mb-4">🥈</div>
                <div className="text-2xl font-black uppercase mb-2">2ème Place</div>
                <div className="text-xl font-bold mb-4">{second.groupName}</div>
                <div className="bg-neo-white border-4 border-neo-black px-6 py-3">
                  <div className="text-4xl font-black text-neo-blue">{second.points}</div>
                  <div className="text-sm font-bold">points</div>
                </div>
              </div>
              <div className="bg-neo-blue border-8 border-neo-black w-full" style={{ height: '120px' }}></div>
            </div>
          )}

          {/* 1ère place */}
          {first && (
            <div className="flex flex-col items-center animate-float">
              <div className="card-neo bg-neo-yellow p-8 text-center mb-4" style={{ width: '280px' }}>
                <div className="text-8xl mb-4 animate-float">🏆</div>
                <div className="text-3xl font-black uppercase mb-2">1ère Place</div>
                <div className="text-2xl font-bold mb-4">{first.groupName}</div>
                <div className="bg-neo-white border-4 border-neo-black px-6 py-4">
                  <div className="text-5xl font-black text-neo-purple">{first.points}</div>
                  <div className="text-sm font-bold">points</div>
                </div>
              </div>
              <div className="bg-neo-yellow border-8 border-neo-black w-full" style={{ height: '180px' }}></div>
            </div>
          )}

          {/* 3ème place */}
          {third && (
            <div className="flex flex-col items-center animate-float" style={{ animationDelay: '1s' }}>
              <div className="card-neo bg-neo-pink p-8 text-center mb-4" style={{ width: '250px' }}>
                <div className="text-7xl mb-4">🥉</div>
                <div className="text-2xl font-black uppercase mb-2">3ème Place</div>
                <div className="text-xl font-bold mb-4">{third.groupName}</div>
                <div className="bg-neo-white border-4 border-neo-black px-6 py-3">
                  <div className="text-4xl font-black text-neo-pink">{third.points}</div>
                  <div className="text-sm font-bold">points</div>
                </div>
              </div>
              <div className="bg-neo-pink border-8 border-neo-black w-full" style={{ height: '80px' }}></div>
            </div>
          )}
        </div>

        {/* Détails des scores */}
        <div className="card-neo bg-neo-white max-w-3xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-6 text-center">
            Tableau détaillé
          </h2>
          <div className="space-y-4">
            {scores.map((score, index) => (
              <div
                key={score.group_number}
                className={`card-neo p-4 flex justify-between items-center ${
                  index === 0 ? 'bg-neo-yellow' :
                  index === 1 ? 'bg-neo-blue' :
                  'bg-neo-pink'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-black">#{index + 1}</div>
                  <div>
                    <div className="text-xl font-black uppercase">
                      Groupe {score.group_number}
                    </div>
                    <div className="text-lg font-bold">{score.groupName}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black">{score.points}</div>
                  <div className="text-sm font-bold opacity-70">points</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-neo-yellow border-4 border-neo-black">
            <p className="text-sm font-bold text-center">
              💡 Les points sont calculés selon la formule : Prix de l'usage × Nombre de groupes qui l'ont sélectionné
            </p>
          </div>
        </div>

        {/* Confettis ASCII */}
        <div className="text-center mt-12 text-4xl animate-float">
          🎉 🎊 ✨ 🎈 🎉 🎊 ✨ 🎈
        </div>
      </div>
    </div>
  );
};

export default Podium;
