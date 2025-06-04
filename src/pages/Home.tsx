import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Trophy, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import GameCard from '../components/ui/GameCard';
import StatCard from '../components/ui/StatCard';

const Home: React.FC = () => {
  const { userProfile } = useAuth();
  const { games, loading } = useGame();
  const [popularGames, setPopularGames] = useState<any[]>([]);

  useEffect(() => {
    if (games.length > 0) {
      // Get top 3 popular games
      const popular = [...games].sort((a, b) => b.popularity - a.popularity).slice(0, 3);
      setPopularGames(popular);
    }
  }, [games]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative px-6 py-16 sm:px-8 sm:py-24 lg:py-32 lg:px-12 max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Aposte seu <span className="text-purple-400">tempo</span>, não seu dinheiro
          </h1>
          <p className="mt-6 max-w-lg text-xl text-gray-300">
            Bem-vindo ao MinuteBet — aqui você aposta minutos da sua vida, não dinheiro. Perdeu? Assista a um vídeo para recuperar seu tempo!
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              to="/games"
              className="inline-flex items-center rounded-lg bg-purple-600 px-6 py-3 text-lg font-medium text-white shadow-md hover:bg-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 active:scale-95"
            >
              Começar a Jogar
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
            <Link
              to="/leaderboard"
              className="inline-flex items-center rounded-lg bg-gray-800 px-6 py-3 text-lg font-medium text-white shadow-md hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 active:scale-95"
            >
              Ranking
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {userProfile && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Seu Saldo" 
            value={`${userProfile.minutes} min`} 
            icon={<Clock className="h-6 w-6 text-purple-400" />} 
            color="bg-purple-900"
          />
          <StatCard 
            title="Jogos Jogados" 
            value={userProfile.gamesPlayed.toString()} 
            icon={<TrendingUp className="h-6 w-6 text-blue-400" />} 
            color="bg-blue-900"
          />
          <StatCard 
            title="Total Ganho" 
            value={`${userProfile.totalWon} min`} 
            icon={<Trophy className="h-6 w-6 text-green-400" />} 
            color="bg-green-900"
          />
          <StatCard 
            title="Seu Nível" 
            value={userProfile.level.toString()} 
            icon={<Star className="h-6 w-6 text-yellow-400" />} 
            color="bg-yellow-900"
          />
        </section>
      )}

      {/* Popular Games */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Jogos Populares</h2>
          <Link to="/games" className="text-purple-400 hover:text-purple-300 hover:underline flex items-center transition-colors duration-200">
            Ver Todos <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="bg-gray-800 rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-5 transition-transform hover:-translate-y-1">
            <div className="flex justify-center items-center h-12 w-12 rounded-md bg-purple-600 text-white mb-4">1</div>
            <h3 className="text-lg font-medium text-white">Aposte Seus Minutos</h3>
            <p className="mt-2 text-gray-300">Use seus minutos para apostar em jogos. Cada jogo oferece diferentes formas de aposta.</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-5 transition-transform hover:-translate-y-1">
            <div className="flex justify-center items-center h-12 w-12 rounded-md bg-purple-600 text-white mb-4">2</div>
            <h3 className="text-lg font-medium text-white">Ganhe ou Perca</h3>
            <p className="mt-2 text-gray-300">Se ganhar, acumule minutos. Se perder, recupere seu tempo assistindo vídeos.</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-5 transition-transform hover:-translate-y-1">
            <div className="flex justify-center items-center h-12 w-12 rounded-md bg-purple-600 text-white mb-4">3</div>
            <h3 className="text-lg font-medium text-white">Assista para Recuperar</h3>
            <p className="mt-2 text-gray-300">Perdeu minutos? Assista vídeos para recuperar e continue jogando!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;