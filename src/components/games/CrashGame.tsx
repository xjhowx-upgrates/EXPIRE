import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Zap } from 'lucide-react'
import { useGameStore } from '../../stores/gameStore'
import { useTimeStore } from '../../stores/timeStore'
import toast from 'react-hot-toast'

export const CrashGame: React.FC = () => {
  const [multiplier, setMultiplier] = useState<number>(1.00)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasCashedOut, setHasCashedOut] = useState(false)
  const [bet, setBet] = useState<number>(100)
  const [crashPoint, setCrashPoint] = useState<number>(0)
  const [gameHistory, setGameHistory] = useState<number[]>([])
  
  const { startGame, endGame } = useGameStore()
  const { timeRemaining } = useTimeStore()
  const intervalRef = useRef<NodeJS.Timeout>()

  const TIME_COST = 4 // 4 minutos por jogo

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const generateCrashPoint = () => {
    // Algoritmo para gerar ponto de crash realista
    const random = Math.random()
    if (random < 0.33) return 1 + Math.random() * 1 // 1.00 - 2.00
    if (random < 0.66) return 2 + Math.random() * 3 // 2.00 - 5.00
    if (random < 0.9) return 5 + Math.random() * 5 // 5.00 - 10.00
    return 10 + Math.random() * 40 // 10.00 - 50.00
  }

  const startRound = async () => {
    if (timeRemaining < TIME_COST) {
      toast.error('Tempo insuficiente para jogar!')
      return
    }

    const canStart = await startGame('crash_game', TIME_COST)
    if (!canStart) return

    const newCrashPoint = generateCrashPoint()
    setCrashPoint(newCrashPoint)
    setMultiplier(1.00)
    setIsPlaying(true)
    setHasStarted(true)
    setHasCashedOut(false)

    // Iniciar animação do multiplicador
    let currentMultiplier = 1.00
    const increment = 0.01
    const speed = 100 // ms

    intervalRef.current = setInterval(() => {
      currentMultiplier += increment
      setMultiplier(currentMultiplier)

      if (currentMultiplier >= newCrashPoint) {
        // Crash!
        clearInterval(intervalRef.current!)
        setIsPlaying(false)
        
        if (!hasCashedOut) {
          // Perdeu
          endGame('crash', 0, false, 0)
          toast.error(`Crash em ${newCrashPoint.toFixed(2)}x! Você perdeu.`)
        }
        
        setGameHistory(prev => [newCrashPoint, ...prev.slice(0, 9)])
        
        setTimeout(() => {
          setHasStarted(false)
        }, 2000)
      }
    }, speed)
  }

  const cashOut = () => {
    if (!isPlaying || hasCashedOut) return

    setHasCashedOut(true)
    setIsPlaying(false)
    clearInterval(intervalRef.current!)

    const winAmount = Math.floor(bet * multiplier)
    endGame('cash_out', winAmount, true, multiplier)
    toast.success(`Cash out em ${multiplier.toFixed(2)}x! Você ganhou ${winAmount} pontos!`)

    setTimeout(() => {
      setHasStarted(false)
    }, 2000)
  }

  const getMultiplierColor = () => {
    if (multiplier < 2) return 'text-green-400'
    if (multiplier < 5) return 'text-yellow-400'
    if (multiplier < 10) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🚀 Crash Game</h1>
          <p className="text-gray-300">Saque antes do crash e multiplique seus pontos!</p>
          <div className="mt-4">
            <span className="text-yellow-400 font-bold">
              Custo: {TIME_COST} minutos
            </span>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          {/* Multiplier Display */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ 
                scale: isPlaying ? [1, 1.1, 1] : 1,
                rotate: isPlaying ? [0, 5, -5, 0] : 0
              }}
              transition={{ 
                duration: 0.5, 
                repeat: isPlaying ? Infinity : 0 
              }}
              className={`text-8xl font-bold ${getMultiplierColor()}`}
            >
              {multiplier.toFixed(2)}x
            </motion.div>
            
            {!hasStarted && (
              <p className="text-gray-400 mt-2">Aguardando próxima rodada...</p>
            )}
            
            {isPlaying && (
              <motion.p
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-yellow-400 mt-2 font-bold"
              >
                🚀 Voando...
              </motion.p>
            )}
            
            {hasStarted && !isPlaying && (
              <p className="text-red-400 mt-2 font-bold">
                💥 CRASH em {crashPoint.toFixed(2)}x!
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            {/* Bet Input */}
            <div className="flex items-center gap-4">
              <label className="text-white font-medium">Aposta:</label>
              <input
                type="number"
                value={bet}
                onChange={(e) => setBet(Math.max(10, parseInt(e.target.value) || 10))}
                disabled={hasStarted}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                min="10"
                max="1000"
              />
              <span className="text-gray-400">pontos</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {!hasStarted && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startRound}
                  disabled={timeRemaining < TIME_COST}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg transition-all ${
                    timeRemaining < TIME_COST
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                  }`}
                >
                  <TrendingUp className="w-6 h-6" />
                  Iniciar Rodada
                </motion.button>
              )}

              {isPlaying && !hasCashedOut && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cashOut}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
                >
                  <DollarSign className="w-6 h-6" />
                  Cash Out ({(bet * multiplier).toFixed(0)} pts)
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Game History */}
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Histórico de Crashes
          </h3>
          <div className="flex flex-wrap gap-2">
            {gameHistory.map((crash, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  crash < 2 
                    ? 'bg-red-500/20 text-red-400' 
                    : crash < 5 
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-green-500/20 text-green-400'
                }`}
              >
                {crash.toFixed(2)}x
              </motion.div>
            ))}
          </div>
          {gameHistory.length === 0 && (
            <p className="text-gray-400 text-sm">Nenhum jogo ainda...</p>
          )}
        </div>
      </div>
    </div>
  )
}