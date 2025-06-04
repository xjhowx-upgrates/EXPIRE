import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../contexts/GameContext'; // Certifique-se que o caminho para GameContext está correto

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  // Verificação essencial: se o objeto game não existir ou não tiver um ID, não renderiza nada.
  if (!game || !game.id) {
    console.warn('GameCard: game ou game.id está undefined. Card não renderizado. Game data:', game);
    return null; 
  }

  const isFortuneGame = game.name === 'Fortune Tiger';
  // Usando game.id que agora sabemos que existe por causa da verificação acima.
  const linkPath = isFortuneGame ? `/app/jogos/detalhes/${game.id}` : `/app/jogos/${game.id}`;

  // Valores padrão para evitar erros se forem undefined
  const gameName = game.name || "Nome Indisponível";
  // Lembre-se de adicionar uma imagem chamada placeholder-image.png na sua pasta public
  // ou use um link de uma imagem placeholder online válida.
  const gameImageUrl = game.imageUrl || "/placeholder-image.png"; 

  const displayMinBet = typeof game.minBet === 'number' ? game.minBet.toString() : 'N/A';
  const displayMaxBet = typeof game.maxBet === 'number' ? game.maxBet.toString() : 'N/A';

  return (
    <Link to={linkPath} className="game-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <img 
        src={gameImageUrl} 
        alt={`Imagem do jogo ${gameName}`}
        className="w-full h-48 object-cover" 
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 truncate">{gameName}</h3>
        
        {/* Se você usa game.description, pode adicionar uma verificação similar: */}
        {/* {game.description && (
          <p className="text-gray-400 text-sm mb-2 flex-grow">{game.description}</p>
        )} */}
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-yellow-400">{displayMinBet}-{displayMaxBet} min</span>
            {/* Se você usa game.popularity, pode adicionar uma verificação similar: */}
            {/* {typeof game.popularity === 'number' && (
              <span className="text-sm text-gray-300">Popularidade: {game.popularity}</span>
            )} */}
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Jogar
          </button>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;