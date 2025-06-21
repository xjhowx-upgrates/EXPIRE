import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Crown, Gem } from 'lucide-react'
import { Achievement } from '../../lib/supabase'

interface AchievementCardProps {
  achievement: Achievement
  isUnlocked: boolean
  unlockedAt?: string
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isUnlocked,
  unlockedAt,
}) => {
  const getRarityIcon = () => {
    switch (achievement.rarity) {
      case 'Comum': return <Trophy className="w-6 h-6 text-gray-400" />
      case 'Raro': return <Star className="w-6 h-6 text-blue-400" />
      case 'Épico': return <Crown className="w-6 h-6 text-purple-400" />
      case 'Lendário': return <Gem className="w-6 h-6 text-yellow-400" />
      default: return <Trophy className="w-6 h-6 text-gray-400" />
    }
  }

  const getRarityColor = () => {
    switch (achievement.rarity) {
      case 'Comum': return 'from-gray-600 to-gray-700 border-gray-500'
      case 'Raro': return 'from-blue-600 to-blue-700 border-blue-500'
      case 'Épico': return 'from-purple-600 to-purple-700 border-purple-500'
      case 'Lendário': return 'from-yellow-600 to-yellow-700 border-yellow-500'
      default: return 'from-gray-600 to-gray-700 border-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${getRarityColor()} border p-4 ${
        isUnlocked ? '' : 'opacity-50 grayscale'
      }`}
    >
      {/* Efeito de brilho para conquistas desbloqueadas */}
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {getRarityIcon()}
            <div>
              <h3 className="text-white font-bold text-lg">{achievement.name}</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20 text-white">
                {achievement.rarity}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-yellow-400 font-bold text-lg">
              {achievement.points}
            </div>
            <div className="text-xs text-gray-300">pontos</div>
          </div>
        </div>

        <p className="text-gray-200 text-sm mb-3">{achievement.description}</p>

        {isUnlocked && unlockedAt && (
          <div className="text-xs text-green-400 font-medium">
            Desbloqueada em {new Date(unlockedAt).toLocaleDateString('pt-BR')}
          </div>
        )}

        {!isUnlocked && (
          <div className="text-xs text-gray-400">
            🔒 Conquista bloqueada
          </div>
        )}
      </div>
    </motion.div>
  )
}