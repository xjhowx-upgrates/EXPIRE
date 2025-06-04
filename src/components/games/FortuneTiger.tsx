import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGame } from '../../hooks/useGame';

interface FortuneTigerProps {
  game: any;
  betAmount: number;
  setBetAmount: (amount: number) => void;
}

import { symbolImages, FortuneTigerSymbol } from './FortuneTigerSymbols';

// Slot machine symbols com nomes e imagens corretos
const symbols: { id: FortuneTigerSymbol; value: number }[] = [
  { id: 'tigre', value: 5 },
  { id: 'dragão', value: 4 },
  { id: 'moeda', value: 3 },
  { id: 'lanterna', value: 2 },
  { id: 'cereja', value: 1 },
];

const FortuneTiger: React.FC<FortuneTigerProps> = ({
  game,
  betAmount,
  setBetAmount,
}: {
  game: any;
  betAmount: number;
  setBetAmount: (amount: number) => void;
}) => {
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

  const getRandomSymbol = (): { id: FortuneTigerSymbol; value: number } => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const spin = async (): Promise<void> => {
    if (isSpinning) return;
    if (!userProfile || userProfile.minutes < betAmount) {
      setMessage('Minutos insuficientes para fazer esta aposta!');
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
            // Forçar cenário de vitória
            const winningSymbol = symbols[Math.floor(Math.random() * 3)]; // Mais chance de símbolo de maior valor
            const winMultiplier = winningSymbol.value;
            const win = betAmount * winMultiplier;
            
            setWinAmount(win);
            setMessage(`Você ganhou ${win} minutos!`);
            
            // Mostrar símbolos iguais para vitória
            const winningReels = [
              [winningSymbol, winningSymbol, winningSymbol],
              [winningSymbol, winningSymbol, winningSymbol],
              [winningSymbol, winningSymbol, winningSymbol]
            ];
            setReels(winningReels);
          } else {
            // Manter símbolos aleatórios para derrota
            setMessage('Você perdeu! Assista um vídeo para ganhar mais minutos.');
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
          {reels.map((reel: { id: FortuneTigerSymbol; value: number }[], reelIndex: number) => (
            <div key={reelIndex} className="bg-black rounded-lg p-2 flex flex-col items-center">
              {reel.map((symbol: { id: FortuneTigerSymbol; value: number }, symbolIndex: number) => (
                <div
                  key={`${reelIndex}-${symbolIndex}`}
                  className={`p-1 mb-2 ${isSpinning ? 'animate-pulse' : ''}`}
                >
                  <img
                    src={symbolImages[symbol.id]}
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
          {isSpinning ? 'Girando...' : 'Girar'}
        </button>
      </div>

      <div className="bg-gray-800 p-3 rounded-lg">
        <h3 className="text-white font-medium mb-2">Combinações Premiadas</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {symbols.map(symbol => (
            <div key={symbol.id} className="flex items-center">
              <img
                src={symbolImages[symbol.id]}
                alt={symbol.id}
                className="w-8 h-8 object-cover rounded mr-2"
              />
              <span className="text-gray-300">
                3x {symbol.id} = {symbol.value}x aposta
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FortuneTiger;