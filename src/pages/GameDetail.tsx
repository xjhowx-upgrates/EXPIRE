import React from 'react'
import { useParams } from 'react-router-dom'
import { SlotMachine } from '../components/games/SlotMachine'
import { CrashGame } from '../components/games/CrashGame'
import { RouletteGame } from '../components/games/RouletteGame'

export const GameDetail: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>()

  const renderGame = () => {
    switch (gameId) {
      case 'slot-machine':
        return <SlotMachine />
      case 'crash-game':
        return <CrashGame />
      case 'roulette':
        return <RouletteGame />
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Jogo não encontrado
              </h1>
              <p className="text-gray-400">
                O jogo que você está procurando não existe ou ainda não foi implementado.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {renderGame()}
    </div>
  )
}