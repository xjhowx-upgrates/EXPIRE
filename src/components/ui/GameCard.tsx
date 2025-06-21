import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Star, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface GameCardProps {
  id: string
  title: string
  description: string
  timeCost: number
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  category: string
  image: string
  isLocked?: boolean
}

export const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  description,
  timeCost,
  difficulty,
  category,
  image,
  isLocked = false,
}) => {
  const navigate = useNavigate()

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400 bg-green-400/20'
      case 'Médio': return 'text-yellow-400 bg-yellow-400/20'
      case 'Difícil': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const handlePlay = () => {
    if (!isLocked) {
      navigate(`/game/${id}`)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 cursor-pointer group ${
        isLocked ? 'opacity-60' : ''
      }`}
      onClick={handlePlay}
    >
      {/* Imagem de fundo */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        
        {/* Badge de categoria */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium bg-purple-500/80 text-white rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Badge de dificuldade */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${getDifficultyColor()}`}>
            {difficulty}
          </span>
        </div>

        {/* Ícone de bloqueado */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-4xl">🔒</div>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Informações do jogo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{timeCost} min</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-gray-600" />
            <Star className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Botão de jogar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all ${
            isLocked
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
          }`}
          disabled={isLocked}
        >
          {isLocked ? 'Bloqueado' : 'Jogar Agora'}
        </motion.button>
      </div>
    </motion.div>
  )
}