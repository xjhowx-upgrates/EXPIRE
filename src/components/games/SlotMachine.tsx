import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, Trophy } from 'lucide-react'
import { useGameStore } from '../../stores/gameStore'
import { useTimeStore } from '../../stores/timeStore'
import toast from 'react-hot-toast'

const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '🔔', '7️⃣']
const REELS = 5
const ROWS = 3

export const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<string[][]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastWin, setLastWin] = useState<number>(0)
  const [multiplier, setMultiplier] = useState<number>(1)
  const { startGame, endGame, isPlaying } = useGameStore()
  const { timeRemaining } = useTimeStore()

  const TIME_COST = 3 // 3 minutos por jogo

  useEffect(() => {
    initializeReels()
  }, [])

  const initializeReels = () => {
    const newReels = Array(REELS).fill(null).map(() =>
      Array(ROWS).fill(null).map(() => 
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      )
    )
    setReels(newReels)
  }

  const spinReels = async () => {
    if (timeRemaining < TIME_COST) {
      toast.error('Tempo insuficiente para jogar!')
      return
    }

    const canStart = await startGame('slot_machine', TIME_COST)
    if (!canStart) return

    setIsSpinning(true)
    setLastWin(0)
    setMultiplier(1)

    // Simular animação de giro
    const spinDuration = 2000 + Math.random() * 1000
    
    setTimeout(() => {
      const newReels = Array(REELS).fill(null).map(() =>
        Array(ROWS).fill(null).map(() => 
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        )
      )
      setReels(newReels)
      
      const { score, won, multiplier: winMultiplier } = calculateWin(newReels)
      setLastWin(score)
      setMultiplier(winMultiplier)
      setIsSpinning(false)

      endGame(won ? 'win' : 'loss', score, won, winMultiplier)
      
      if (won) {
        toast.success(`Parabéns! Você ganhou ${score} pontos!`)
      }
    }, spinDuration)
  }

  const calculateWin = (gameReels: string[][]) => {
    let totalScore = 0
    let maxMultiplier = 1
    let hasWin = false

    // Verificar linhas horizontais
    for (let row = 0; row < ROWS; row++) {
      const line = gameReels.map(reel => reel[row])
      const { score, multiplier } = checkLine(line)
      if (score > 0) {
        totalScore += score
        maxMultiplier = Math.max(maxMultiplier, multiplier)
        hasWin = true
      }
    }

    // Verificar diagonais
    const diagonal1 = gameReels.map((reel, index) => reel[index % ROWS])
    const diagonal2 = gameReels.map((reel, index) => reel[ROWS - 1 - (index % ROWS)])
    
    const diag1Result = checkLine(diagonal1)
    const diag2Result = checkLine(diagonal2)
    
    if (diag1Result.score > 0) {
      totalScore += diag1Result.score
      maxMultiplier = Math.max(maxMultiplier, diag1Result.multiplier)
      hasWin = true
    }
    
    if (diag2Result.score > 0) {
      totalScore += diag2Result.score
      maxMultiplier = Math.max(maxMultiplier, diag2Result.multiplier)
      hasWin = true
    }

    return { score: totalScore, won: hasWin, multiplier: maxMultiplier }
  }

  const checkLine = (line: string[]) => {
    const counts = line.reduce((acc, symbol) => {
      acc[symbol] = (acc[symbol] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    let maxCount = 0
    let winningSymbol = ''
    
    Object.entries(counts).forEach(([symbol, count]) => {
      if (count > maxCount) {
        maxCount = count
        winningSymbol = symbol
      }
    })

    if (maxCount >= 3) {
      const baseScore = getSymbolValue(winningSymbol)
      const multiplier = maxCount === 5 ? 5 : maxCount === 4 ? 3 : 1.5
      return { score: Math.floor(baseScore * multiplier), multiplier }
    }

    return { score: 0, multiplier: 1 }
  }

  const getSymbolValue = (symbol: string) => {
    const values: Record<string, number> = {
      '🍒': 10,
      '🍋': 15,
      '🍊': 20,
      '🍇': 25,
      '⭐': 50,
      '💎': 100,
      '🔔': 75,
      '7️⃣': 200,
    }
    return values[symbol] || 10
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8 border border-purple-500/30">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎰 Slot Machine</h1>
          <p className="text-purple-200">Gire os rolos e tente a sorte!</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-yellow-400 font-bold">
              Custo: {TIME_COST} minutos
            </span>
            {lastWin > 0 && (
              <span className="text-green-400 font-bold">
                Última vitória: {lastWin} pontos (x{multiplier})
              </span>
            )}
          </div>
        </div>

        {/* Slot Machine */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-5 gap-2 mb-6">
            {reels.map((reel, reelIndex) => (
              <div key={reelIndex} className="space-y-2">
                {reel.map((symbol, symbolIndex) => (
                  <motion.div
                    key={`${reelIndex}-${symbolIndex}`}
                    animate={isSpinning ? { 
                      y: [-20, 0, -20],
                      rotateX: [0, 360, 0]
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isSpinning ? Infinity : 0,
                      delay: reelIndex * 0.1
                    }}
                    className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-3xl border border-gray-700"
                  >
                    {symbol}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={spinReels}
              disabled={isSpinning || timeRemaining < TIME_COST}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg transition-all ${
                isSpinning || timeRemaining < TIME_COST
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
              }`}
            >
              {isSpinning ? (
                <RotateCcw className="w-6 h-6 animate-spin" />
              ) : (
                <Play className="w-6 h-6" />
              )}
              {isSpinning ? 'Girando...' : 'Girar'}
            </motion.button>
          </div>
        </div>

        {/* Paytable */}
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Tabela de Pagamentos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {SYMBOLS.map((symbol) => (
              <div key={symbol} className="flex items-center gap-2 text-gray-300">
                <span className="text-lg">{symbol}</span>
                <span>{getSymbolValue(symbol)} pts</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-400">
            <p>• 3 símbolos iguais: x1.5 multiplicador</p>
            <p>• 4 símbolos iguais: x3 multiplicador</p>
            <p>• 5 símbolos iguais: x5 multiplicador</p>
          </div>
        </div>
      </div>
    </div>
  )
}