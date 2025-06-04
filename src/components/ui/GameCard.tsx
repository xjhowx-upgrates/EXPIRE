import { Link } from 'react-router-dom';
import { Clock, Users, Flame } from 'lucide-react';

// Definição da interface Game
export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  type: string;
  minBet?: number;
  maxBet?: number;
  popularity?: number;
}

interface GameCardProps {
  game: Game;
  key?: string;
}

const GameCard = ({ game }: GameCardProps) => {
  const onlinePlayers = Math.floor(Math.random() * 100) + 10;

  // Determinar se é um jogo da série Fortune Tiger
  const isFortuneGame = game.name.toLowerCase().includes('fortune') || game.name.toLowerCase().includes('lucky');
  
  // Determinar o caminho correto com base no tipo de jogo
  const linkPath = isFortuneGame ? `/app/jogos/detalhes/${game.id}` : `/app/jogos/${game.id}`;
  
  return (
    <Link to={linkPath} className="block bg-gray-800 rounded-xl overflow-hidden shadow-md transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-purple-400 cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        {/* Imagem do jogo */}
        {game.imageUrl ? (
          <img 
            src={game.imageUrl} 
            alt={game.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-purple-900 to-indigo-900"></div>
        )}
        
        {/* Overlay com nome do jogo */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-200 group-hover:bg-opacity-60">
          <h3 className="text-2xl font-bold text-white">{game.name}</h3>
        </div>
        
        {/* Badge para jogos da série Fortune */}
        {isFortuneGame && (
          <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <Flame className="h-3 w-3 mr-1" />
            HOT
          </div>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-gray-300 mb-4 line-clamp-2 h-12">{game.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>{game.minBet}-{game.maxBet} min</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <Users className="h-4 w-4 mr-1" />
            <span>{onlinePlayers} online</span>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all duration-150 shadow focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95">
          Jogar Agora
        </button>
      </div>
    </Link>
  );
};

export default GameCard;