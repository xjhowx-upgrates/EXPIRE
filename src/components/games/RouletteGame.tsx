import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCw, DollarSign, Target } from 'lucide-react'
import { useGameStore } from '../../stores/gameStore'
import { useTimeStore } from '../../stores/timeStore'
import toast from 'react-hot-toast'

const NUMBERS = Array.from({ length: 37 }, (_, i) => i) // 0-36
const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]

interface Bet {
  type: 'number' | 'color' | 'even_odd' | 'high_low'
  value: number | string
  amount: number
  payout: number
}

export const RouletteGame: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [winningNumber, setWinningNumber] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [betAmount, setBetAmount] = useState(50)

  const { startGame, endGame } = useGameStore()
  const { timeRemaining } = useTimeStore()

  const TIME_COST = 5 // 5 minutos por jogo

  const getNumberColor = (num: number) => {
    if (num === 0) return 'green'
    return RED_NUMBERS.includes(num) ? 'red' : 'black'
  }

  const addBet = (type: Bet['type'], value: number | string, payout: number) => {
    if (isSpinning) return
    
    const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0) + betAmount
    if (totalBetAmount > 500) {
      toast.error('Limite máximo de apostas: 500 pontos')
      return
    }

    setBets(prev => [...prev, { type, value, amount: betAmount, payout }])
    toast.success(`Aposta de ${betAmount} pontos adicionada`)
  }

  const clearBets = () => {
    if (isSpinning) return
    setBets([])
    toast.info('Apostas removidas')
  }

  const spin = async () => {
    if (bets.length === 0) {
      toast.error('Adicione pelo menos uma aposta!')
      return
    }

    if (timeRemaining < TIME_COST) {
      toast.error('Tempo insuficiente para jogar!')
      return
    }

    const canStart = await startGame('roulette', TIME_COST)
    if (!canStart) return

    setIsSpinning(true)
    setWinningNumber(null)

    // Gerar número vencedor
    const winner = Math.floor(Math.random() * 37)
    
    // Animação da roleta
    const spins = 5 + Math.random() * 5
    const finalRotation = rotation + (spins * 360) + (winner * (360 / 37))
    setRotation(finalRotation)

    setTimeout(() => {
      setWinningNumber(winner)
      setIsSpinning(false)
      calculateWinnings(winner)
    }, 3000)
  }

  const calculateWinnings = (winner: number) => {
    let totalWinnings = 0
    let totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0)
    let winningBets = 0

    bets.forEach(bet => {
      let isWinner = false

      switch (bet.type) {
        case 'number':
          isWinner = bet.value === winner
          break
        case 'color':
          if (bet.value === 'red') isWinner = RED_NUMBERS.includes(winner)
          else if (bet.value === 'black') isWinner = BLACK_NUMBERS.includes(winner)
          else if (bet.value === 'green') isWinner = winner === 0
          break
        case 'even_odd':
          if (winner === 0) isWinner = false
          else isWinner = bet.value === 'even' ? winner % 2 === 0 : winner % 2 === 1
          break
        case 'high_low':
          if (winner === 0) isWinner = false
          else isWinner = bet.value === 'high' ? winner >= 19 : winner <= 18
          break
      }

      if (isWinner) {
        totalWinnings += bet.amount * bet.payout
        winningBets++
      }
    })

    const netResult = totalWinnings - totalBetAmount
    const won = netResult > 0

    endGame(
      won ? 'win' : 'loss',
      Math.max(0, netResult),
      won,
      totalWinnings > 0 ? totalWinnings / totalBetAmount : 0
    )

    if (won) {
      toast.success(`Parabéns! Você ganhou ${totalWinnings} pontos!`)
    } else {
      toast.error(`Número ${winner} (${getNumberColor(winner)}). Você perdeu ${totalBetAmount} pontos.`)
    }

    setBets([])
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-br from-green-900 to-red-900 rounded-2xl p-8 border border-green-500/30">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎯 Roleta Europeia</h1>
          <p className="text-green-200">Faça suas apostas e gire a roleta!</p>
          <div className="mt-4">
            <span className="text-yellow-400 font-bold">
              Custo: {TIME_COST} minutos
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Roleta */}
          <div className="flex flex-col items-center">
            <div className="relative w-80 h-80 mb-6">
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="w-full h-full rounded-full border-8 border-yellow-400 bg-gradient-to-br from-green-800 to-red-800 relative overflow-hidden"
              >
                {/* Números da roleta */}
                {NUMBERS.map((num, index) => {
                  const angle = (index * 360) / 37
                  const color = getNumberColor(num)
                  return (
                    <div
                      key={num}
                      className={`absolute w-6 h-6 flex items-center justify-center text-xs font-bold text-white transform -translate-x-1/2 -translate-y-1/2 ${
                        color === 'red' ? 'bg-red-600' : 
                        color === 'black' ? 'bg-black' : 'bg-green-600'
                      }`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${angle}deg) translateY(-140px) rotate(-${angle}deg)`,
                      }}
                    >
                      {num}
                    </div>
                  )
                })}
              </motion.div>
              
              {/* Ponteiro */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400"></div>
              </div>
            </div>

            {/* Resultado */}
            {winningNumber !== null && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`text-4xl font-bold p-4 rounded-xl border-2 ${
                  getNumberColor(winningNumber) === 'red' 
                    ? 'bg-red-600 border-red-400 text-white'
                    : getNumberColor(winningNumber) === 'black'
                    ? 'bg-black border-gray-400 text-white'
                    : 'bg-green-600 border-green-400 text-white'
                }`}
              >
                {winningNumber}
              </motion.div>
            )}
          </div>

          {/* Apostas */}
          <div className="space-y-6">
            {/* Controles de aposta */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-bold mb-3">Valor da Aposta</h3>
              <div className="flex gap-2 mb-4">
                {[10, 25, 50, 100].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      betAmount === amount
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                min="1"
                max="100"
              />
            </div>

            {/* Tipos de apostas */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-bold mb-3">Tipos de Apostas</h3>
              
              {/* Cores */}
              <div className="mb-4">
                <h4 className="text-gray-300 font-medium mb-2">Cores (2:1)</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => addBet('color', 'red', 2)}
                    disabled={isSpinning}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    Vermelho
                  </button>
                  <button
                    onClick={() => addBet('color', 'black', 2)}
                    disabled={isSpinning}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    Preto
                  </button>
                  <button
                    onClick={() => addBet('color', 'green', 36)}
                    disabled={isSpinning}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    Verde (36:1)
                  </button>
                </div>
              </div>

              {/* Par/Ímpar */}
              <div className="mb-4">
                <h4 className="text-gray-300 font-medium mb-2">Par/Ímpar (2:1)</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => addBet('even_odd', 'even', 2)}
                    disabled={isSpinning}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Par
                  </button>
                  <button
                    onClick={() => addBet('even_odd', 'odd', 2)}
                    disabled={isSpinning}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    Ímpar
                  </button>
                </div>
              </div>

              {/* Alto/Baixo */}
              <div className="mb-4">
                <h4 className="text-gray-300 font-medium mb-2">Alto/Baixo (2:1)</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => addBet('high_low', 'low', 2)}
                    disabled={isSpinning}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                  >
                    1-18
                  </button>
                  <button
                    onClick={() => addBet('high_low', 'high', 2)}
                    disabled={isSpinning}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                  >
                    19-36
                  </button>
                </div>
              </div>
            </div>

            {/* Apostas atuais */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-bold mb-3">Suas Apostas</h3>
              {bets.length > 0 ? (
                <div className="space-y-2">
                  {bets.map((bet, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                      <span className="text-white">
                        {bet.type === 'number' ? `Número ${bet.value}` : 
                         bet.type === 'color' ? `Cor ${bet.value}` :
                         bet.type === 'even_odd' ? (bet.value === 'even' ? 'Par' : 'Ímpar') :
                         bet.value === 'high' ? '19-36' : '1-18'}
                      </span>
                      <span className="text-yellow-400">{bet.amount} pts</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-600 pt-2">
                    <div className="flex justify-between font-bold text-white">
                      <span>Total:</span>
                      <span>{bets.reduce((sum, bet) => sum + bet.amount, 0)} pts</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Nenhuma aposta ainda</p>
              )}
            </div>

            {/* Controles */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={spin}
                disabled={isSpinning || bets.length === 0 || timeRemaining < TIME_COST}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                  isSpinning || bets.length === 0 || timeRemaining < TIME_COST
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                }`}
              >
                <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                {isSpinning ? 'Girando...' : 'Girar Roleta'}
              </motion.button>

              <button
                onClick={clearBets}
                disabled={isSpinning}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-all"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}