import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGame } from '../../hooks/useGame';

interface CrashProps {
  game: any;
  betAmount: number;
  setBetAmount: (amount: number) => void;
}

const Crash: React.FC<CrashProps> = ({ game, betAmount, setBetAmount }) => {
  const { userProfile } = useAuth();
  const { betMinutes } = useGame();
  const [isPlaying, setIsPlaying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.00);
  const [isCrashed, setIsCrashed] = useState(false);
  const [autoExitValue, setAutoExitValue] = useState(2.00);
  const [hasCashed, setHasCashed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const crashTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const graphPointsRef = useRef<{x: number, y: number}[]>([]);

  const generateCrashPoint = (): number => {
    // 70% chance to crash below 2x
    if (Math.random() < 0.7) {
      return 1 + Math.random();
    } else {
      // 30% chance to go higher
      return 1 + Math.random() * 9;
    }
  };

  const crashPoint = useRef<number>(generateCrashPoint());

  useEffect(() => {
    if (isPlaying && !isCrashed) {
      // Start animation loop
      let lastTimestamp = 0;
      const updateGraph = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        
        // Increase multiplier
        setMultiplier(prevMultiplier => {
          const newMultiplier = prevMultiplier + (prevMultiplier * 0.00005 * deltaTime);
          
          // Check if we've reached the crash point
          if (newMultiplier >= crashPoint.current && !isCrashed) {
            setIsCrashed(true);
            setIsPlaying(false);
            setMessage("Crashed! You lost your bet.");
            
            if (crashTimeoutRef.current) {
              clearTimeout(crashTimeoutRef.current);
            }
            
            return crashPoint.current;
          }
          
          // Check if we've reached auto exit
          if (newMultiplier >= autoExitValue && !hasCashed) {
            handleCashOut();
          }
          
          return newMultiplier;
        });
        
        // Update graph
        if (graphRef.current) {
          const width = graphRef.current.clientWidth;
          const height = graphRef.current.clientHeight;
          
          // Map multiplier to graph coordinates
          const x = (multiplier - 1) * (width / 9); // Scale to fit graph width
          const y = height - (height / 10) * Math.min(multiplier, 10); // Scale to fit graph height
          
          graphPointsRef.current.push({ x, y });
          
          // Draw graph
          const ctx = (graphRef.current as HTMLCanvasElement).getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, width, height);
            
            // Draw grid lines
            ctx.strokeStyle = '#4a5568';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 1; i <= 10; i++) {
              const gridY = height - (height / 10) * i;
              ctx.moveTo(0, gridY);
              ctx.lineTo(width, gridY);
              
              // Draw multiplier label
              ctx.fillStyle = '#a0aec0';
              ctx.font = '10px Arial';
              ctx.fillText(`${i.toFixed(1)}x`, 5, gridY - 5);
            }
            ctx.stroke();
            
            // Draw curve
            ctx.strokeStyle = isCrashed ? '#f56565' : '#805ad5';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, height);
            
            graphPointsRef.current.forEach(point => {
              ctx.lineTo(point.x, point.y);
            });
            
            ctx.stroke();
            
            // Draw current multiplier
            const currentX = (multiplier - 1) * (width / 9);
            const currentY = height - (height / 10) * Math.min(multiplier, 10);
            
            ctx.fillStyle = isCrashed ? '#f56565' : '#805ad5';
            ctx.beginPath();
            ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        if (!isCrashed && isPlaying) {
          animationRef.current = requestAnimationFrame(updateGraph);
        }
      };
      
      animationRef.current = requestAnimationFrame(updateGraph);
      
      // Set a timeout for the crash to occur
      crashTimeoutRef.current = setTimeout(() => {
        if (!hasCashed) {
          setIsCrashed(true);
          setIsPlaying(false);
          setMessage("Crashed! You lost your bet.");
          betMinutes(game.id, betAmount);
        }
      }, (crashPoint.current - 1) * 10000); // Scale time based on crash point
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (crashTimeoutRef.current) {
          clearTimeout(crashTimeoutRef.current);
        }
      };
    }
  }, [isPlaying, isCrashed, game.id, betAmount, hasCashed, autoExitValue]);

  const startGame = async () => {
    if (!userProfile || userProfile.minutes < betAmount) {
      setMessage('Minutos insuficientes para fazer esta aposta!');
      return;
    }
    
    setIsPlaying(true);
    setIsCrashed(false);
    setHasCashed(false);
    setMessage(null);
    setWinAmount(null);
    graphPointsRef.current = [];
    crashPoint.current = generateCrashPoint();
  };

  const handleCashOut = async () => {
    if (!isPlaying || hasCashed || isCrashed) return;
    
    setHasCashed(true);
    setIsPlaying(false);
    
    const winnings = Math.floor(betAmount * multiplier);
    setWinAmount(winnings);
    setMessage(`Retirada em ${multiplier.toFixed(2)}x! Você ganhou ${winnings} minutos.`);
    
    // Simulate a win
    await betMinutes(game.id, betAmount);
  };

  const increaseBet = () => {
    if (!isPlaying && userProfile && betAmount < Math.min(game.maxBet, userProfile.minutes)) {
      setBetAmount(betAmount + 5);
    }
  };

  const decreaseBet = () => {
    if (!isPlaying && betAmount > game.minBet) {
      setBetAmount(betAmount - 5);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold text-white">
          {multiplier.toFixed(2)}x
        </div>
        <div className="bg-gray-800 px-3 py-1 rounded text-gray-300 text-sm">
          {isPlaying ? 'Em Progresso' : isCrashed ? 'Crashou' : 'Pronto'}
        </div>
      </div>
      
      <div className="relative mb-6">
        <canvas 
          ref={graphRef}
          className="w-full h-60 bg-gray-800 rounded-lg"
          width={500}
          height={240}
        ></canvas>
      </div>
      
      {message && (
        <div className={`text-center mb-4 p-2 rounded ${message.includes('won') || message.includes('Cashed') ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Valor da Aposta</label>
          <div className="flex items-center">
            <button 
              onClick={decreaseBet} 
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPlaying || betAmount <= game.minBet}
            >
              -
            </button>
            <div className="bg-gray-800 px-4 py-1 text-white">
              {betAmount} min
            </div>
            <button 
              onClick={increaseBet} 
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPlaying || !userProfile || betAmount >= Math.min(game.maxBet, userProfile.minutes)}
            >
              +
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-1">Retirada Automática</label>
          <input
            type="number"
            value={autoExitValue}
            onChange={(e) => setAutoExitValue(Math.max(1.01, parseFloat(e.target.value) || 1.01))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white disabled:opacity-50"
            min="1.01"
            step="0.1"
            disabled={isPlaying}
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <button 
          onClick={startGame}
          disabled={isPlaying || !userProfile || userProfile.minutes < betAmount}
          className={`px-6 py-2 rounded-lg font-medium ${
            isPlaying || !userProfile || userProfile.minutes < betAmount
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {isCrashed ? 'Jogar Novamente' : 'Iniciar Jogo'}
        </button>
        
        <button 
          onClick={handleCashOut}
          disabled={!isPlaying || hasCashed || isCrashed}
          className={`px-6 py-2 rounded-lg font-medium ${
            !isPlaying || hasCashed || isCrashed
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Cash Out
        </button>
      </div>
    </div>
  );
};

export default Crash;