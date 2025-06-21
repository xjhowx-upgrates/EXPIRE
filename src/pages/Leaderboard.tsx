import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Crown, Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useLeaderboardStore } from '../stores/leaderboardStore'
import { LeaderboardCard } from '../components/ui/LeaderboardCard'

export const Leaderboard: React.FC = () => {
  const { user } = useAuthStore()
  const { entries, loading, fetchLeaderboard, getUserRank } = useLeaderboardStore()
  const [userRank, setUserRank] = React.useState<number | null>(null)

  useEffect(() => {
    fetchLeaderboard()
    if (user) {
      getUserRank(user.id).then(setUserRank)
    }
  }, [user])

  const topThree = entries.slice(0, 3)
  const restOfLeaderboard = entries.slice(3)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Carregando ranking...</p>
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
            👑 Ranking Global
          </h1>
          <p className="text-xl text-gray-300">
            Os melhores jogadores da plataforma
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Total de Jogadores</p>
                <p className="text-3xl font-bold">{entries.length.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          {user && userRank && (
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Sua Posição</p>
                  <p className="text-3xl font-bold">#{userRank}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-200" />
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-200 text-sm">Pontuação Líder</p>
                <p className="text-3xl font-bold">
                  {entries[0]?.total_points.toLocaleString() || '0'}
                </p>
              </div>
              <Crown className="w-8 h-8 text-yellow-200" />
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              🏆 Pódio dos Campeões
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 2º Lugar */}
              {topThree[1] && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="order-1 md:order-1"
                >
                  <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl p-6 border-2 border-gray-500 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                    </div>
                    <div className="text-center pt-4">
                      <Medal className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-white font-bold text-xl mb-2">{topThree[1].username}</h3>
                      <p className="text-3xl font-bold text-gray-300 mb-2">
                        {topThree[1].total_points.toLocaleString()}
                      </p>
                      <p className="text-gray-400 text-sm">pontos</p>
                      <div className="mt-4 text-xs text-gray-400">
                        <p>{topThree[1].games_played} jogos • {topThree[1].win_rate.toFixed(1)}% vitórias</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 1º Lugar */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="order-2 md:order-2"
              >
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 border-2 border-yellow-500 relative transform md:scale-110">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      👑
                    </div>
                  </div>
                  <div className="text-center pt-6">
                    <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-2xl mb-2">{topThree[0].username}</h3>
                    <p className="text-4xl font-bold text-yellow-300 mb-2">
                      {topThree[0].total_points.toLocaleString()}
                    </p>
                    <p className="text-yellow-200 text-sm">pontos</p>
                    <div className="mt-4 text-sm text-yellow-200">
                      <p>{topThree[0].games_played} jogos • {topThree[0].win_rate.toFixed(1)}% vitórias</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3º Lugar */}
              {topThree[2] && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="order-3 md:order-3"
                >
                  <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 border-2 border-amber-500 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                    </div>
                    <div className="text-center pt-4">
                      <Award className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                      <h3 className="text-white font-bold text-xl mb-2">{topThree[2].username}</h3>
                      <p className="text-3xl font-bold text-amber-300 mb-2">
                        {topThree[2].total_points.toLocaleString()}
                      </p>
                      <p className="text-amber-200 text-sm">pontos</p>
                      <div className="mt-4 text-xs text-amber-200">
                        <p>{topThree[2].games_played} jogos • {topThree[2].win_rate.toFixed(1)}% vitórias</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Rest of Leaderboard */}
        {restOfLeaderboard.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Classificação Geral
            </h2>
            
            <div className="space-y-4">
              {restOfLeaderboard.map((entry, index) => (
                <LeaderboardCard
                  key={entry.id}
                  entry={entry}
                  position={index + 4}
                  isCurrentUser={user?.id === entry.user_id}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Ranking em construção
            </h3>
            <p className="text-gray-400">
              Seja o primeiro a aparecer no ranking jogando nossos jogos!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}