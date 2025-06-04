import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGame } from '../../hooks/useGame';

interface FortuneTigerProps {
  game: any;
  betAmount: number;
  setBetAmount: (amount: number) => void;
}

// Slot machine symbols
const symbols = [
  { id: 'tiger', value: 5, image: 'https://via.placeholder.com/80?text=Tiger' },
  { id: 'dragon', value: 4, image: 'https://via.placeholder.com/80?text=Dragon' },
  { id: 'coin', value: 3, image: 'https://via.placeholder.com/80?text=Coin' },
  { id: 'lantern', value: 2, image: 'https://via.placeholder.com/80?text=Lantern' },
  { id: 'cherry', value: 1, image: 'https://via.placeholder.com/80?text=Cherry' }
];

const FortuneTiger: React.FC<FortuneTigerProps> = ({ game, betAmount, setBetAmount }) => {
  const { userProfile } = useAuth();
  const { betMinutes } = useGame();
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState([
    [symbols[0], symbols[1], symbols[2]],
    [symbols[1], symbols[2], symbols[3]],
    [symbols[2], symbols[3], symbols[4]]
  ]);
  const [message, setMessage] = useState<string | null>(null);
  const [winAmount, setWinAmount] = useState<number | null>(null);

  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const spin = async () => {
    if (isSpinning) return;
    if (!userProfile || userProfile.minutes < betAmount) {
      setMessage('Not enough minutes to place this bet!');
      return;
    }

    setIsSpinning(true);
    setMessage(null);
    setWinAmount(null);

    // Animate reels
    const animationDuration = 2000;
    const startTime = Date.now();
    const animateReels = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      if (progress < 1) {
        // Generate random symbols during animation
        setReels([
          [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
          [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
          [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]
        ]);
        requestAnimationFrame(animateReels);
      } else {
        // Final result
        const finalReels = [
          [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
          [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
          [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]
        ];
        setReels(finalReels);
        
        // Check for win
        setTimeout(async () => {
          const result = await betMinutes(game.id, betAmount);
          
          if (result) {
            // Force a win scenario
            const winningSymbol = symbols[Math.floor(Math.random() * 3)]; // More likely to get higher value symbols
            const winMultiplier = winningSymbol.value;
            const win = betAmount * winMultiplier;
            
            setWinAmount(win);
            setMessage(`You won ${win} minutes!`);
            
            // Show matching symbols for a win
            const winningReels = [
              [winningSymbol, winningSymbol, winningSymbol],
              [winningSymbol, winningSymbol, winningSymbol],
              [winningSymbol, winningSymbol, winningSymbol]
            ];
            setReels(winningReels);
          } else {
            // Keep random symbols for a loss
            setMessage('You lost! Watch a video to get more minutes.');
          }
          
          setIsSpinning(false);
        }, 500);
      }
    };

    requestAnimationFrame(animateReels);
  };

  const increaseBet = () => {
    if (!isSpinning && userProfile && betAmount < Math.min(game.maxBet, userProfile.minutes)) {
      setBetAmount(betAmount + 5);
    }
  };

  const decreaseBet = () => {
    if (!isSpinning && betAmount > game.minBet) {
      setBetAmount(betAmount - 5);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="bg-gradient-to-r from-red-900 to-yellow-900 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-3 gap-2">
          {reels.map((reel, reelIndex) => (
            <div key={reelIndex} className="bg-black rounded-lg p-2 flex flex-col items-center">
              {reel.map((symbol, symbolIndex) => (
                <div
                  key={`${reelIndex}-${symbolIndex}`}
                  className={`p-1 mb-2 ${isSpinning ? 'animate-pulse' : ''}`}
                >
                  <img
                    src={symbol.image}
                    alt={symbol.id}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div className={`text-center mb-4 p-2 rounded ${message.includes('won') ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
          {message}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button 
            onClick={decreaseBet} 
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSpinning || betAmount <= game.minBet}
          >
            -
          </button>
          <div className="bg-gray-800 px-4 py-1 text-white">
            {betAmount} min
          </div>
          <button 
            onClick={increaseBet} 
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSpinning || !userProfile || betAmount >= Math.min(game.maxBet, userProfile.minutes)}
          >
            +
          </button>
        </div>
        
        <button 
          onClick={spin}
          disabled={isSpinning || !userProfile || userProfile.minutes < betAmount}
          className={`px-6 py-2 rounded-lg font-medium ${
            isSpinning || !userProfile || userProfile.minutes < betAmount
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
      </div>

      <div className="bg-gray-800 p-3 rounded-lg">
        <h3 className="text-white font-medium mb-2">Winning Combinations</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {symbols.map(symbol => (
            <div key={symbol.id} className="flex items-center">
              <img
                src={symbol.image}
                alt={symbol.id}
                className="w-8 h-8 object-cover rounded mr-2"
              />
              <span className="text-gray-300">
                3x {symbol.id} = {symbol.value}x bet
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FortuneTiger;