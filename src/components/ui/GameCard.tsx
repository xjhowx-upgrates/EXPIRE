import React from 'react';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const name = game?.name ?? 'Nome Indisponível';
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center text-white">
      {name}
    </div>
  );
};

export default GameCard;