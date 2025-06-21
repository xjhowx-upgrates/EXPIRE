import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Crown, Gem, Award } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useAchievementStore } from '../stores/achievementStore'
import { AchievementCard } from '../components/ui/AchievementCard'

export const Achievements: React.FC = () => {
  const { user } = useAuthStore()
  const { 
    achievements, 
    userAchievements, 
    loading, 
    fetchAchievements, 
    fetchUserAchievements 
  } = useAchievementStore()

  useEffect(() => {
    fetchAchievements()
    if (user) {
      fetchUserAchievements()
    }
  }, [user])

  const unlockedAchievements = userAchievements.map(ua => ua.achievement_id)
  const totalPoints = userAchievements.reduce((sum, ua) => {
    const achievement = achievements.find(a => a.id === ua.achievement_id)
    return sum + (achievement?.points || 0)
  }, 0)

  const rarityStats = {
    'Comum': achievements.filter(a => a.rarity === 'Comum').length,
    'Raro': achievements.filter(a => a.rarity === 'Raro').length,
    'Épico': achievements.filter(a => a.rarity === 'Épico').length,
    'Lendário': achievements.filter(a => a.rarity === 'Lendário').length,
  }

  const unlockedByRarity = {
    'Comum': userAchievements.filter(ua => {
      const achievement = achievements.find(a => a.id === ua.achievement_id)
      return achievement?.rarity === 'Comum'
    }).length,
    'Raro': userAchievements.filter(ua => {
      const achievement = achievements.find(a => a.id === ua.achievement_id)
      return achievement?.rarity === 'Raro'
    }).length,
    'Épico': userAchievements.filter(ua => {
      const achievement = achievements.find(a => a.id === ua.achievement_id)
      return achievement?.rarity === 'Épico'
    }).length,
    'Lendário': userAchievements.filter(ua => {
      const achievement = achievements.find(a => a.id === ua.achievement_id)
      return achievement?.rarity === 'Lendário'
    }).length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Carregando conquistas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            🏆 Conquistas
          </h1>
          <p className="text-xl text-gray-300">
            Desbloqueie conquistas e ganhe pontos extras!
          </p>
        </motion.div>

        {/* Stats */}
        {user && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200 text-sm">Total de Pontos</p>
                  <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Desbloqueadas</p>
                  <p className="text-3xl font-bold">
                    {userAchievements.length}/{achievements.length}
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Progresso</p>
                  <p className="text-3xl font-bold">
                    {achievements.length > 0 
                      ? Math.round((userAchievements.length / achievements.length) * 100)
                      : 0
                    }%
                  </p>
                </div>
                <Star className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Lendárias</p>
                  <p className="text-3xl font-bold">
                    {unlockedByRarity['Lendário']}/{rarityStats['Lendário']}
                  </p>
                </div>
                <Crown className="w-8 h-8 text-green-200" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Rarity Breakdown */}
        {user && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700"
          >
            <h3 className="text-white font-bold text-xl mb-4">Progresso por Raridade</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(rarityStats).map(([rarity, total]) => {
                const unlocked = unlockedByRarity[rarity as keyof typeof unlockedByRarity]
                const percentage = total > 0 ? (unlocked / total) * 100 : 0
                
                const getRarityIcon = () => {
                  switch (rarity) {
                    case 'Comum': return <Trophy className="w-5 h-5 text-gray-400" />
                    case 'Raro': return <Star className="w-5 h-5 text-blue-400" />
                    case 'Épico': return <Crown className="w-5 h-5 text-purple-400" />
                    case 'Lendário': return <Gem className="w-5 h-5 text-yellow-400" />
                    default: return <Trophy className="w-5 h-5 text-gray-400" />
                  }
                }

                return (
                  <div key={rarity} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getRarityIcon()}
                    </div>
                    <h4 className="text-white font-medium text-sm">{rarity}</h4>
                    <p className="text-gray-300 text-sm">{unlocked}/{total}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          rarity === 'Comum' ? 'bg-gray-400' :
                          rarity === 'Raro' ? 'bg-blue-400' :
                          rarity === 'Épico' ? 'bg-purple-400' : 'bg-yellow-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const userAchievement = userAchievements.find(ua => ua.achievement_id === achievement.id)
            const isUnlocked = !!userAchievement
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <AchievementCard
                  achievement={achievement}
                  isUnlocked={isUnlocked}
                  unlockedAt={userAchievement?.unlocked_at}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {achievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Nenhuma conquista disponível
            </h3>
            <p className="text-gray-400">
              As conquistas serão carregadas em breve!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}