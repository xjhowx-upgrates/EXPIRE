import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Crown } from 'lucide-react'
import { LeaderboardEntry } from '../../lib/supabase'

interface LeaderboardCardProps {
  entry: LeaderboardEntry
  position: number
  isCurrentUser?: boolean
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  entry,
  position,
  isCurrentUser = false,
}) => {
  const getRankIcon = () => {
    switch (position) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <Trophy className="w-5 h-5 text-gray-500" />
    }
  }

  const getRankColor = () => {
    if (isCurrentUser) return 'from-blue-600 to-blue-700 border-blue-500'
    switch (position) {
      case 1: return 'from-yellow-600 to-yellow-700 border-yellow-500'
      case 2: return 'from-gray-600 to-gray-700 border-gray-500'
      case 3: return 'from-amber-600 to-amber-700 border-amber-500'
      default: return 'from-gray-800 to-gray-900 border-gray-700'
    }
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: position * 0.1 }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${getRankColor()} border p-4 ${
        isCurrentUser ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {getRankIcon()}
            <span className="text-2xl font-bold text-white">#{position}</span>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg">{entry.username}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>{entry.games_played} jogos</span>
              <span>{entry.win_rate.toFixed(1)}% vitórias</span>
              <span>{entry.achievements_count} conquistas</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-yellow-400 font-bold text-2xl">
            {entry.total_points.toLocaleString()}
          </div>
          <div className="text-xs text-gray-300">pontos</div>
        </div>
      </div>

      {isCurrentUser && (
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
            Você
          </span>
        </div>
      )}
    </motion.div>
  )
}