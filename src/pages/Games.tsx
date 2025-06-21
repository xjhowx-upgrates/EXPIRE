import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Clock, Star } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useTimeStore } from '../stores/timeStore'
import { GameCard } from '../components/ui/GameCard'

const ALL_GAMES = [
  {
    id: 'slot-machine',
    title: 'Slot Machine',
    description: 'Caça-níqueis clássico com 5 rolos e múltiplas linhas de pagamento. Símbolos especiais e multiplicadores.',
    timeCost: 3,
    difficulty: 'Fácil' as const,
    category: 'Slots',
    image: 'https://images.pexels.com/photos/6664189/pexels-photo-6664189.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'crash-game',
    title: 'Crash Game',
    description: 'Jogo de multiplicador crescente. Saque antes do crash e multiplique seus pontos!',
    timeCost: 4,
    difficulty: 'Médio' as const,
    category: 'Estratégia',
    image: 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'roulette',
    title: 'Roleta Europeia',
    description: 'Roleta clássica europeia com apostas múltiplas. Cores, números, par/ímpar e muito mais.',
    timeCost: 5,
    difficulty: 'Médio' as const,
    category: 'Mesa',
    image: 'https://images.pexels.com/photos/6664189/pexels-photo-6664189.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'sweet-bonanza',
    title: 'Sweet Bonanza',
    description: 'Slot temático de doces com grid 5x6. Símbolos em cascata e multiplicadores especiais.',
    timeCost: 4,
    difficulty: 'Médio' as const,
    category: 'Slots',
    image: 'https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLocked: true,
  },
  {
    id: 'mines',
    title: 'Campo Minado',
    description: 'Jogo de campo minado com multiplicadores progressivos. Quanto mais longe, maior o prêmio!',
    timeCost: 6,
    difficulty: 'Difícil' as const,
    category: 'Estratégia',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLocked: true,
  },
  {
    id: 'blackjack',
    title: 'Blackjack',
    description: 'Jogo de cartas clássico contra a casa. Chegue o mais próximo de 21 sem estourar.',
    timeCost: 5,
    difficulty: 'Médio' as const,
    category: 'Cartas',
    image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=400',
    isLocked: true,
  },
]

const CATEGORIES = ['Todos', 'Slots', 'Mesa', 'Cartas', 'Estratégia']
const DIFFICULTIES = ['Todas', 'Fácil', 'Médio', 'Difícil']

export const Games: React.FC = () => {
  const { user } = useAuthStore()
  const { timeRemaining, initializeTime } = useTimeStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('Todos')
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('Todas')

  useEffect(() => {
    if (user) {
      initializeTime()
    }
  }, [user])

  const filteredGames = ALL_GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || game.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'Todas' || game.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

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
            Biblioteca de Jogos
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Escolha seu jogo favorito e comece a jogar agora!
          </p>
          
          {user && (
            <div className="flex items-center justify-center gap-4 text-lg">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">
                  {Math.floor(timeRemaining / 60)}h {timeRemaining % 60}m restantes
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar jogos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {DIFFICULTIES.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <GameCard {...game} isLocked={game.isLocked || !user} />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Nenhum jogo encontrado
            </h3>
            <p className="text-gray-400">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
          </motion.div>
        )}

        {/* Coming Soon */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-purple-500/30">
            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Mais jogos em breve!
            </h3>
            <p className="text-gray-300">
              Estamos trabalhando em novos jogos incríveis para você. 
              Fique ligado nas atualizações!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}