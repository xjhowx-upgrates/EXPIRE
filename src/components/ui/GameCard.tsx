import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../contexts/GameContext';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  // Defensive checks for all accessed properties
  if (!game) {
    console.error('GameCard: Received undefined game prop');
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center text-red-500">
        Erro: Jogo não disponível
      </div>
    );
  }

  // Placeholder base64 para fallback
  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCIgZmlsbD0iIzFhMjEzMiI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjN2Y4M2E4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+Q2FycmVnYW5kbyBpbWFnZW0uLi48L3RleHQ+PC9zdmc+';
  
  const {
    id = 'unknown-id',
    name = 'Nome Indisponível',
    imageUrl = placeholderImage,
    description = 'Descrição não disponível.',
    minBet = 0,
    maxBet = 0
  } = game;

  // Safely convert numbers to strings
  const displayMinBet = typeof minBet === 'number' ? minBet.toString() : '0';
  const displayMaxBet = typeof maxBet === 'number' ? maxBet.toString() : '0';

  return (
    <Link to={`/app/game/${id}`} className="block group">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // Evita loop de erro se o fallback também falhar
              if (target.src !== placeholderImage) {
                target.onerror = null;
                target.src = placeholderImage;
              }
            }}
            loading="lazy"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-white mb-2 truncate" title={name}>
            {name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 h-16 overflow-y-auto flex-grow">
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