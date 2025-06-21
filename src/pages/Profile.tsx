import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Clock, 
  Target, 
  Edit3, 
  Save,
  X
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useGameStore } from '../stores/gameStore'
import { useAchievementStore } from '../stores/achievementStore'
import toast from 'react-hot-toast'

export const Profile: React.FC = () => {
  const { profile, updateProfile } = useAuthStore()
  const { getGameHistory } = useGameStore()
  const { userAchievements, fetchUserAchievements } = useAchievementStore()
  
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    full_name: '',
    username: '',
  })
  const [gameHistory, setGameHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        username: profile.username || '',
      })
    }
    
    fetchUserAchievements()
    loadGameHistory()
  }, [profile])

  const loadGameHistory = async () => {
    const history = await getGameHistory()
    setGameHistory(history.slice(0, 10)) // Últimos 10 jogos
  }

  const handleSave = async () => {
    if (!editForm.full_name.trim()) {
      toast.error('Nome completo é obrigatório')
      return
    }

    setLoading(true)
    try {
      await updateProfile(editForm)
      setIsEditing(false)
    } catch (error) {
      // Error handled in store
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        username: profile.username || '',
      })
    }
    setIsEditing(false)
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  const winRate = profile.games_played > 0 
    ? ((profile.total_wins / profile.games_played) * 100).toFixed(1)
    : '0'

  const totalAchievementPoints = userAchievements.reduce((sum, ua) => {
    // Assumindo que temos os dados da conquista
    return sum + 100 // Placeholder - seria calculado com base nas conquistas
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-300">
            Gerencie suas informações e veja suas estatísticas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Nome completo"
                    />
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Nome de usuário"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all"
                      >
                        <Save className="w-4 h-4" />
                        Salvar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {profile.full_name || 'Usuário'}
                    </h2>
                    <p className="text-gray-400 mb-4">
                      @{profile.username || 'usuario'}
                    </p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all mx-auto"
                    >
                      <Edit3 className="w-4 h-4" />
                      Editar Perfil
                    </button>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">
                    Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats and History */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-white">
                <Trophy className="w-8 h-8 text-purple-200 mb-2" />
                <p className="text-2xl font-bold">{profile.total_points.toLocaleString()}</p>
                <p className="text-purple-200 text-sm">Pontos</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white">
                <Target className="w-8 h-8 text-blue-200 mb-2" />
                <p className="text-2xl font-bold">{profile.games_played}</p>
                <p className="text-blue-200 text-sm">Jogos</p>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-white">
                <Trophy className="w-8 h-8 text-green-200 mb-2" />
                <p className="text-2xl font-bold">{winRate}%</p>
                <p className="text-green-200 text-sm">Vitórias</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-4 text-white">
                <Clock className="w-8 h-8 text-yellow-200 mb-2" />
                <p className="text-2xl font-bold">
                  {Math.floor(profile.total_time_minutes / 60)}h {profile.total_time_minutes % 60}m
                </p>
                <p className="text-yellow-200 text-sm">Tempo</p>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Conquistas Recentes
              </h3>
              
              {userAchievements.length > 0 ? (
                <div className="space-y-3">
                  {userAchievements.slice(0, 5).map((ua, index) => (
                    <div key={ua.id} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      <div className="flex-1">
                        <p className="text-white font-medium">Conquista Desbloqueada</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(ua.unlocked_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Nenhuma conquista ainda. Jogue para desbloquear!</p>
              )}
            </div>

            {/* Game History */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Histórico de Jogos
              </h3>
              
              {gameHistory.length > 0 ? (
                <div className="space-y-3">
                  {gameHistory.map((game, index) => (
                    <div key={game.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${game.won ? 'bg-green-400' : 'bg-red-400'}`} />
                        <div>
                          <p className="text-white font-medium capitalize">
                            {game.game_type.replace('_', ' ')}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {new Date(game.started_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-bold ${game.won ? 'text-green-400' : 'text-red-400'}`}>
                          {game.won ? '+' : ''}{game.score} pts
                        </p>
                        <p className="text-gray-400 text-sm">
                          {game.time_cost}min
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Nenhum jogo ainda. Comece a jogar!</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}