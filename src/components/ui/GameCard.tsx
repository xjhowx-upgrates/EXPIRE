import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../contexts/GameContext';

// Placeholder base64 para fallback
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCIgZmlsbD0iIzFhMjEzMiI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjN2Y4M2E4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+Q2FycmVnYW5kbyBpbWFnZW0uLi48L3RleHQ+PC9zdmc+';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [imgSrc, setImgSrc] = useState('');
  const [hasError, setHasError] = useState(false);
  
  // Validação inicial do objeto game
  if (!game || typeof game !== 'object') {
    console.error('GameCard: Propriedade game inválida:', game);
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center text-red-500">
        Erro: Dados do jogo inválidos
      </div>
    );
  }

  // Extrai valores com fallbacks seguros
  const {
    id = 'unknown-id',
    name = 'Jogo sem nome',
    description = 'Descrição não disponível',
    minBet = 0,
    maxBet = 0,
    imageUrl = ''
  } = game;

  // Efeito para gerenciar o carregamento da imagem
  useEffect(() => {
    // Reseta o estado de erro quando a imagem mudar
    setHasError(false);
    
    // Se não houver imageUrl, usa o placeholder
    if (!imageUrl || typeof imageUrl !== 'string') {
      setImgSrc(PLACEHOLDER_IMAGE);
      return;
    }
    
    // Tenta carregar a imagem fornecida
    setImgSrc(imageUrl);
  }, [imageUrl]);

  // Função para lidar com erro no carregamento da imagem
  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(PLACEHOLDER_IMAGE);
    }
  };

  // Formata os valores das apostas
  const formatBetValue = (value: unknown): string => {
    if (typeof value === 'number') {
      return value.toString();
    }
    if (typeof value === 'string' && !isNaN(Number(value))) {
      return value;
    }
    return '0';
  };

  const displayMinBet = formatBetValue(minBet);
  const displayMaxBet = formatBetValue(maxBet);

  return (
    <Link 
      to={`/app/game/${id}`} 
      className="block group h-full"
      aria-label={`Jogar ${name}`}
    >
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
        <div className="w-full h-48 bg-gray-700 overflow-hidden relative">
          <img 
            src={imgSrc} 
            alt={`Imagem do jogo ${name}`} 
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
              hasError ? 'opacity-50' : ''
            }`}
            onError={handleImageError}
            loading="lazy"
            width="400"
            height="300"
          />
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
              <span className="text-gray-400 text-sm">Imagem não disponível</span>
            </div>
          )}
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