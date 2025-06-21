import React from 'react'
import { Clock, Zap } from 'lucide-react'
import { useTimeStore } from '../../stores/timeStore'
import { motion } from 'framer-motion'

export const TimeDisplay: React.FC = () => {
  const { timeRemaining } = useTimeStore()

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getTimeColor = () => {
    if (timeRemaining <= 30) return 'text-red-400'
    if (timeRemaining <= 60) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getTimeIcon = () => {
    if (timeRemaining <= 30) return <Zap className="w-5 h-5 text-red-400" />
    return <Clock className="w-5 h-5 text-blue-400" />
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700"
    >
      {getTimeIcon()}
      <span className={`font-bold text-lg ${getTimeColor()}`}>
        {formatTime(timeRemaining)}
      </span>
      <span className="text-gray-400 text-sm">restantes</span>
    </motion.div>
  )
}