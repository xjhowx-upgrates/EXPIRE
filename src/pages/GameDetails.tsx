import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Clock, Users, ArrowLeft } from 'lucide-react';
import { Game } from '../components/ui/GameCard';

const GameDetails = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null as Game | null);
  const [loading, setLoading] = useState(true);
  const onlinePlayers = Math.floor(Math.random() * 100) + 10;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        if (!gameId) return;
        const docRef = doc(db, 'games', gameId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGame(docSnap.data() as Game);
        } else {
          setGame(null);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do jogo:', error);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGame();
    }
  }, [gameId]);

  // Determinar se é um jogo da série Fortune Tiger
  const isFortuneGame = game?.name.toLowerCase().includes('fortune') || game?.name.toLowerCase().includes('lucky');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-white mb-4">Jogo não encontrado</h2>
        <Link to="/app/jogos" className="text-purple-500 hover:underline flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para a lista de jogos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/app/jogos" className="text-purple-500 hover:underline flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar para a lista de jogos
      </Link>
      
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        {/* Cabeçalho do jogo */}
        <div className="relative h-64 md:h-96">
          {game.imageUrl ? (
            <img 
              src={game.imageUrl} 
              alt={game.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-purple-900 to-indigo-900"></div>
          )}
          
          {/* Badge para jogos da série Fortune */}
          {isFortuneGame && (
            <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full flex items-center">
              <span className="font-bold mr-1">HOT</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{game.name}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-300">
              <Clock className="h-5 w-5 mr-2" />
              <span>{game.minBet}-{game.maxBet} minutos</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Users className="h-5 w-5 mr-2" />
              <span>{onlinePlayers} jogadores online</span>
            </div>
            
            <div className="bg-purple-700 text-white px-3 py-1 rounded-lg">
              {game.type === 'slots' ? 'Slots' : game.type === 'roulette' ? 'Roleta' : 'Crash'}
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">Descrição</h2>
            <p className="text-gray-300">{game.description}</p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">Como Jogar</h2>
            <ul className="text-gray-300 list-disc list-inside space-y-2">
              <li>Faça seu login na plataforma EXPIRE</li>
              <li>Escolha quanto tempo deseja apostar (entre {game.minBet} e {game.maxBet} minutos)</li>
              <li>Clique em "Jogar Agora" para iniciar</li>
              <li>Divirta-se e acompanhe seus resultados!</li>
            </ul>
          </div>
          
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors text-lg font-medium">
            Jogar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
