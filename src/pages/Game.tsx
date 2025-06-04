import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Users } from 'lucide-react';
import { useGame } from '../hooks/useGame';
import { useAuth } from '../hooks/useAuth';
import Roulette from '../components/games/Roulette';
import Crash from '../components/games/Crash';
import FortuneTiger from '../components/games/FortuneTiger';

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { games, loading } = useGame();
  const { userProfile } = useAuth();
  const [game, setGame] = useState<any | null>(null);
  const [betAmount, setBetAmount] = useState<number>(5);
  const [onlinePlayers] = useState<number>(Math.floor(Math.random() * 500) + 100);

  useEffect(() => {
    if (!loading && games.length > 0 && gameId) {
      const foundGame = games.find(g => g.id === gameId);
      if (foundGame) {
        setGame(foundGame);
        setBetAmount(foundGame.minBet);
      } else {
        navigate('/games');
      }
    }
  }, [gameId, games, loading, navigate]);

  if (loading || !game) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const renderGameComponent = () => {
    switch (game.type) {
      case 'roulette':
        return <Roulette game={game} betAmount={betAmount} setBetAmount={setBetAmount} />;
      case 'crash':
        return <Crash game={game} betAmount={betAmount} setBetAmount={setBetAmount} />;
      case 'slots':
        return <FortuneTiger game={game} betAmount={betAmount} setBetAmount={setBetAmount} />;
      default:
        return (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">Game type not supported.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/games')}
          className="flex items-center text-gray-300 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back to Games</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-400">
            <Users className="h-5 w-5 mr-1" />
            <span>{onlinePlayers} online</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-r from-purple-900 to-indigo-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{game.name}</h1>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="md:w-2/3">
              <div className="flex items-start space-x-2 mb-4">
                <Info className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300">{game.description}</p>
              </div>
              
              {/* Game Component */}
              {renderGameComponent()}
            </div>
            
            <div className="md:w-1/3 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">Game Rules</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p>• Minimum bet: {game.minBet} minutes</p>
                <p>• Maximum bet: {game.maxBet} minutes</p>
                <p>• If you win, you'll double your minutes</p>
                <p>• If you lose, you'll need to watch a video to earn back minutes</p>
                <p>• You currently have {userProfile?.minutes || 0} minutes available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;