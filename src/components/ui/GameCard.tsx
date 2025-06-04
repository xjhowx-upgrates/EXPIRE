import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../contexts/GameContext'; // Verifique se o caminho para GameContext está correto

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  // Verificações defensivas para todas as propriedades acessadas
  const id = game?.id ?? 'unknown-id';
  const name = game?.name ?? 'Nome Indisponível';
  const imageUrl = game?.imageUrl ?? '/images/placeholder.png'; // Imagem placeholder
  const description = game?.description ?? 'Descrição não disponível.';
  
  // Garante que minBet e maxBet são números antes de chamar toString() ou usá-los
  const minBet = game?.minBet;
  const maxBet = game?.maxBet;
  const displayMinBet = typeof minBet === 'number' ? minBet.toString() : 'N/A';
  const displayMaxBet = typeof maxBet === 'number' ? maxBet.toString() : 'N/A';

  // Se o jogo for inválido ou não tiver ID, exibe uma mensagem de erro
  if (!game || !id || id === 'unknown-id') {
    console.error('GameCard: Recebeu jogo inválido ou sem ID:', game);
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center text-red-500">
        Erro: Dados do jogo inválidos.
      </div>
    );
  }

  return (
    <Link to={`/app/game/${id}`} className="block group">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              // Fallback para links de imagem quebrados
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Evita loop de erro se o placeholder também falhar
              target.src = '/images/placeholder.png'; // Caminho para uma imagem placeholder local
            }}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-white mb-2 truncate" title={name}>
            {name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 h-16 overflow-y-auto flex-grow"> {/* Permite scroll se a descrição for longa */}
            {description}
          </p>
          <div className="mt-auto flex justify-between items-center text-sm pt-2">
            <span className="text-green-400">
              Min: <span className="font-bold">{displayMinBet}</span>
            </span>
            <span className="text-red-400">
              Max: <span className="font-bold">{displayMaxBet}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;