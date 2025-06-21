import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, 
  Trophy, 
  Clock, 
  Users, 
  Star, 
  Zap,
  TrendingUp,
  Award,
  Target
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useTimeStore } from '../stores/timeStore'
import { useLeaderboardStore } from '../stores/leaderboardStore'
import { GameCard } from '../components/ui/GameCard'

const FEATURED_GAMES = [
  {
    id: 'slot-machine',
    title: 'Slot Machine',
    description: 'Gire os rolos e tente a sorte nos caça-níqueis clássicos',
    timeCost: 3,
    difficulty: 'Fácil' as const,
    category: 'Slots',
    image: 'https://images.pexels.com/photos/6664189/pexels-photo-6664189.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'crash-game',
    title: 'Crash Game',
    description: 'Multiplicador crescente - saque antes do crash!',
    timeCost: 4,
    difficulty: 'Médio' as const,
    category: 'Estratégia',
    image: 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'roulette',
    title: 'Roleta Europeia',
    description: 'Apostas múltiplas na roleta clássica europeia',
    timeCost: 5,
    difficulty: 'Médio' as const,
    category: 'Mesa',
    image: 'https://images.pexels.com/photos/6664189/pexels-photo-6664189.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
]

export const Home: React.FC = () => {
  const { user, profile } = useAuthStore()
  const { timeRemaining, initializeTime } = useTimeStore()
  const { entries, fetchLeaderboard } = useLeaderboardStore()

  useEffect(() => {
    if (user) {
      initializeTime()
      fetchLeaderboard()
    }
  }, [user])

  const topPlayers = entries.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Bem-vindo ao{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                EXPIRE
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              A plataforma inovadora onde o <strong>tempo é sua moeda</strong>. 
              Jogue, conquiste e domine o ranking global!
            </motion.p>

            {user ? (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  to="/games"
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
                >
                  <Play className="w-6 h-6" />
                  Jogar Agora
                </Link>
                
                <div className="flex items-center gap-2 px-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">
                    {Math.floor(timeRemaining / 60)}h {timeRemaining % 60}m restantes
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
                >
                  <Star className="w-6 h-6" />
                  Começar Agora
                </Link>
                
                <Link
                  to="/login"
                  className="px-8 py-4 border-2 border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Já tenho conta
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {user && profile && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm">Total de Pontos</p>
                    <p className="text-3xl font-bold">{profile.total_points.toLocaleString()}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-purple-200" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Jogos Jogados</p>
                    <p className="text-3xl font-bold">{profile.games_played}</p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-200" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm">Taxa de Vitória</p>
                    <p className="text-3xl font-bold">
                      {profile.games_played > 0 
                        ? ((profile.total_wins / profile.games_played) * 100).toFixed(1)
                        : '0'
                      }%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-200" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-200 text-sm">Tempo Restante</p>
                    <p className="text-3xl font-bold">
                      {Math.floor(timeRemaining / 60)}h {timeRemaining % 60}m
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-200" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Games */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Jogos em Destaque</h2>
            <p className="text-xl text-gray-300">
              Experimente nossos jogos mais populares
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_GAMES.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <GameCard {...game} isLocked={!user} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/games"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
            >
              Ver Todos os Jogos
              <Play className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Top Players */}
      {topPlayers.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Top Jogadores</h2>
              <p className="text-xl text-gray-300">
                Os melhores da plataforma
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-xl p-6 ${
                    index === 0 
                      ? 'bg-gradient-to-br from-yellow-600 to-yellow-700'
                      : index === 1
                      ? 'bg-gradient-to-br from-gray-600 to-gray-700'
                      : 'bg-gradient-to-br from-amber-600 to-amber-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-500' : 'bg-amber-500'
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{player.username}</h3>
                        <p className="text-white/80 text-sm">{player.games_played} jogos</p>
                      </div>
                    </div>
                    <Award className="w-8 h-8 text-white/80" />
                  </div>
                  
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      {player.total_points.toLocaleString()}
                    </p>
                    <p className="text-white/80 text-sm">pontos</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                Ver Ranking Completo
                <TrendingUp className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Por que escolher o EXPIRE?</h2>
            <p className="text-xl text-gray-300">
              Uma experiência única de jogos online
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tempo como Moeda</h3>
              <p className="text-gray-300">
                Sistema inovador onde o tempo é sua moeda principal. Gerencie com sabedoria!
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sistema de Conquistas</h3>
              <p className="text-gray-300">
                Desbloqueie conquistas únicas e ganhe pontos extras para subir no ranking.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ranking Global</h3>
              <p className="text-gray-300">
                Compete com jogadores do mundo todo e prove que você é o melhor!
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}