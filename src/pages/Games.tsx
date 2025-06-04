import { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import GameCard from '../components/ui/GameCard';
import { Game } from '../contexts/GameContext';
import { initializeGames } from '../utils/initializeGames';

const Games = () => {
  const { games, loading } = useGame();
  const [filteredGames, setFilteredGames] = useState([] as Game[]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [initialized, setInitialized] = useState(false);
  
  // Inicializar jogos no Firestore (apenas uma vez)
  useEffect(() => {
    if (!initialized) {
      initializeGames()
        .then(() => setInitialized(true))
        .catch(error => console.error('Erro ao inicializar jogos:', error));
    }
  }, [initialized]);
  
  // Filtrar jogos quando a lista de jogos mudar ou o filtro mudar
  useEffect(() => {
    if (games.length > 0) {
      if (activeFilter === 'all') {
        setFilteredGames(games);
      } else {
        setFilteredGames(games.filter((game: Game) => game.type === activeFilter));
      }
    }
  }, [games, activeFilter]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Jogos</h1>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button 
              className={`${activeFilter === 'all' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-4 py-2 rounded-lg text-sm`}
              onClick={() => setActiveFilter('all')}
            >
              Todos os Jogos
            </button>
            <button 
              className={`${activeFilter === 'roulette' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-4 py-2 rounded-lg text-sm`}
              onClick={() => setActiveFilter('roulette')}
            >
              Roleta
            </button>
            <button 
              className={`${activeFilter === 'crash' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-4 py-2 rounded-lg text-sm`}
              onClick={() => setActiveFilter('crash')}
            >
              Crash
            </button>
            <button 
              className={`${activeFilter === 'slots' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-4 py-2 rounded-lg text-sm`}
              onClick={() => setActiveFilter('slots')}
            >
              Slots
            </button>
          </div>
          
          {/* Fortune Tiger Series Banner */}
          {activeFilter === 'all' || activeFilter === 'slots' ? (
            <div className="w-full bg-gradient-to-r from-amber-600 to-red-700 rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-white mb-2">Série Fortune Tiger</h2>
                  <p className="text-amber-100">Experimente os jogos mais populares inspirados na linha Fortune Tiger da PG Soft!</p>
                </div>
                <div>
                  <button 
                    className="bg-white text-amber-700 hover:bg-amber-100 px-6 py-3 rounded-lg font-medium"
                    onClick={() => setActiveFilter('slots')}
                  >
                    Ver Todos os Slots
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          
          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map((game: Game) => (
                <GameCard key={game.id} game={game} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400 text-lg">Nenhum jogo disponível no momento.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Games;