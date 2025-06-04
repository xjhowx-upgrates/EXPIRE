import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGame } from '../../hooks/useGame';

interface RouletteProps {
  game: any;
  betAmount: number;
  setBetAmount: (amount: number) => void;
}

// Define roulette numbers and their colors
const rouletteNumbers = [
  { number: 0, color: 'green' },
  { number: 32, color: 'red' },
  { number: 15, color: 'black' },
  { number: 19, color: 'red' },
  { number: 4, color: 'black' },
  { number: 21, color: 'red' },
  { number: 2, color: 'black' },
  { number: 25, color: 'red' },
  { number: 17, color: 'black' },
  { number: 34, color: 'red' },
  { number: 6, color: 'black' },
  { number: 27, color: 'red' },
  { number: 13, color: 'black' },
  { number: 36, color: 'red' },
  { number: 11, color: 'black' },
  { number: 30, color: 'red' },
  { number: 8, color: 'black' },
  { number: 23, color: 'red' },
  { number: 10, color: 'black' },
  { number: 5, color: 'red' },
  { number: 24, color: 'black' },
  { number: 16, color: 'red' },
  { number: 33, color: 'black' },
  { number: 1, color: 'red' },
  { number: 20, color: 'black' },
  { number: 14, color: 'red' },
  { number: 31, color: 'black' },
  { number: 9, color: 'red' },
  { number: 22, color: 'black' },
  { number: 18, color: 'red' },
  { number: 29, color: 'black' },
  { number: 7, color: 'red' },
  { number: 28, color: 'black' },
  { number: 12, color: 'red' },
  { number: 35, color: 'black' },
  { number: 3, color: 'red' },
  { number: 26, color: 'black' }
];

type BetType = 'red' | 'black' | 'green' | 'odd' | 'even' | 'high' | 'low' | null;

const Roulette: React.FC<RouletteProps> = ({ game, betAmount, setBetAmount }) => {
  const { userProfile } = useAuth();
  const { betMinutes } = useGame();
  const [selectedBet, setSelectedBet] = useState<BetType>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [resultColor, setResultColor] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleBetSelect = (bet: BetType) => {
    if (!isSpinning) {
      setSelectedBet(bet);
      setMessage(null);
    }
  };

  const handleSpin = async () => {
    if (isSpinning || !selectedBet) return;
    if (!userProfile || userProfile.minutes < betAmount) {
      setMessage('Minutos insuficientes para fazer esta aposta!');
      return;
    }

    setIsSpinning(true);
    setMessage(null);
    setResult(null);
    setResultColor(null);

    // Animate the wheel
    if (wheelRef.current) {
      const spins = 5; // Number of complete rotations
      const randomIndex = Math.floor(Math.random() * rouletteNumbers.length);
      const rotationAmount = spins * 360 + (randomIndex * (360 / rouletteNumbers.length));
      
      wheelRef.current.style.transform = `rotate(${rotationAmount}deg)`;
    }

    // Simulate server response
    setTimeout(async () => {
      const randomIndex = Math.floor(Math.random() * rouletteNumbers.length);
      const winningNumber = rouletteNumbers[randomIndex];
      setResult(winningNumber.number);
      setResultColor(winningNumber.color);

      // Determine if player won
      let isWin = false;
      
      if (selectedBet === 'red' && winningNumber.color === 'red') {
        isWin = true;
      } else if (selectedBet === 'black' && winningNumber.color === 'black') {
        isWin = true;
      } else if (selectedBet === 'green' && winningNumber.color === 'green') {
        isWin = true;
      } else if (selectedBet === 'odd' && winningNumber.number % 2 === 1) {
        isWin = true;
      } else if (selectedBet === 'even' && winningNumber.number % 2 === 0 && winningNumber.number !== 0) {
        isWin = true;
      } else if (selectedBet === 'high' && winningNumber.number >= 19 && winningNumber.number <= 36) {
        isWin = true;
      } else if (selectedBet === 'low' && winningNumber.number >= 1 && winningNumber.number <= 18) {
        isWin = true;
      }

      // Call the betMinutes function from context
      const result = await betMinutes(game.id, betAmount);
      
      // Force the result based on the backend
      if (result) {
        setMessage(`Você ganhou ${betAmount} minutos!`);
      } else {
        setMessage('Você perdeu! Assista um vídeo para ganhar mais minutos.');
      }

      setTimeout(() => {
        setIsSpinning(false);
      }, 1000);
    }, 3000);
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
      <div className="mb-6">
        <div className="relative w-64 h-64 mx-auto">
          <div 
            ref={wheelRef}
            className="absolute inset-0 rounded-full border-4 border-gray-700 bg-gray-800 transition-transform duration-3000 ease-out"
            style={{ transformOrigin: 'center center' }}
          >
            {rouletteNumbers.map((item, index) => {
              const angle = (index * 360) / rouletteNumbers.length;
              const colorClass = 
                item.color === 'red' 
                  ? 'bg-red-600' 
                  : item.color === 'black' 
                    ? 'bg-gray-900' 
                    : 'bg-green-600';
              
              return (
                <div 
                  key={index}
                  className={`absolute h-full w-1 ${colorClass}`}
                  style={{ 
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'bottom center',
                    left: 'calc(50% - 0.5px)'
                  }}
                />
              );
            })}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-white font-bold">
                {result !== null ? result : '?'}
              </span>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-white transform rotate-45"></div>
          </div>
        </div>
      </div>

      {result !== null && resultColor && (
        <div className="text-center mb-4">
          <p className="text-lg text-white">
            Resultado: <span className={`font-bold ${resultColor === 'red' ? 'text-red-500' : resultColor === 'black' ? 'text-gray-300' : 'text-green-500'}`}>
              {result} ({resultColor})
            </span>
          </p>
        </div>
      )}

      {message && (
        <div className={`text-center mb-4 p-2 rounded ${message.includes('won') ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-4">
        <button 
          onClick={() => handleBetSelect('red')} 
          className={`p-2 rounded-lg ${selectedBet === 'red' ? 'bg-red-600 text-white' : 'bg-red-900 text-red-100 hover:bg-red-800'} ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSpinning}
        >
          Vermelho
        </button>
        <button 
          onClick={() => handleBetSelect('black')} 
          className={`p-2 rounded-lg ${selectedBet === 'black' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-100 hover:bg-gray-600'} ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSpinning}
        >
          Preto
        </button>
        <button 
          onClick={() => handleBetSelect('green')} 
          className={`p-2 rounded-lg ${selectedBet === 'green' ? 'bg-green-600 text-white' : 'bg-green-900 text-green-100 hover:bg-green-800'} ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSpinning}
        >
          Verde (0)
        </button>
        <button 
          onClick={() => handleBetSelect('odd')} 
          className={`p-2 rounded-lg ${selectedBet === 'odd' ? 'bg-purple-600 text-white' : 'bg-purple-900 text-purple-100 hover:bg-purple-800'} ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSpinning}
        >
          Ímpar
        </button>
        <button 
          onClick={() => handleBetSelect('even')} 
          className={`p-2 rounded-lg ${selectedBet === 'even' ? 'bg-purple-600 text-white' : 'bg-purple-900 text-purple-100 hover:bg-purple-800'} ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSpinning}
        >
          Par
        </button>
        <button 
          onClick={() => handleBetSelect('low')} 
          className={`p-2 rounded-lg ${selectedBet === 'low' ? 'bg-blue-600 text-white' : 'bg-blue-900 text-blue-100 hover:bg-blue-800'} ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSpinning}
        >
          1-18
        </button>
        <button 
          onClick={() => handleBetSelect('high')} 
          className={`p-2 rounded-lg ${selectedBet === 'high' ? 'bg-blue-600 text-white' : 'bg-blue-900 text-blue-100 hover:bg-blue-800'} ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSpinning}
          style={{ gridColumn: 'span 3' }}
        >
          19-36
        </button>
      </div>

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
          onClick={handleSpin}
          disabled={isSpinning || !selectedBet || !userProfile || userProfile.minutes < betAmount}
          className={`px-6 py-2 rounded-lg font-medium ${
            isSpinning || !selectedBet || !userProfile || userProfile.minutes < betAmount
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {isSpinning ? 'Girando...' : 'Girar'}
        </button>
      </div>
    </div>
  );
};

export default Roulette;