import { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import GameCard from '../components/ui/GameCard';
import { Game } from '../contexts/GameContext';
// import { initializeGames } from '../utils/initializeGames'; // Removido se não estiver usando

const Games = () => {
  const { games, loading } = useGame();
  const [filteredGames, setFilteredGames] = useState<Game[]>([]); // Tipagem explícita
  const [activeFilter, setActiveFilter] = useState('all');
  // const [initialized, setInitialized] = useState(false); // Removido se não estiver usando initializeGames

  useEffect(() => {
    if (games.length > 0) {
      console.log('Games.tsx: Lista de jogos (games) recebida do contexto:', JSON.stringify(games, null, 2)); // Log Adicionado
      if (activeFilter === 'all') {
        setFilteredGames(games);
      } else {
        setFilteredGames(games.filter((game: Game) => game.type === activeFilter));
      }
    } else {
      // Garante que filteredGames seja limpo se games estiver vazio
      setFilteredGames([]);
    }
  }, [games, activeFilter]);

  useEffect(() => {
    // Este log já existia e é útil
    console.log('Games.tsx: Estado atual de games:', games);
    if (games.length === 0 && !loading) {
      console.warn('Games.tsx: Nenhum jogo foi carregado do banco de dados ou a lista está vazia!');
    }
  }, [games, loading]);

  return (
    <div className="min-h-screen bg-[#181c2a] space-y-6 p-4 md:p-8"> {/* Adicionado padding */}
      <h1 className="text-3xl font-bold text-white text-center md:text-left mb-6">Jogos Disponíveis</h1> {/* Ajustado título e margem */}
      
      {!loading && games.length === 0 && (
        <div className="text-center text-red-400 font-bold py-6">
          Erro: Nenhum jogo encontrado no banco de dados!<br />
          Verifique se você está autenticado e se há jogos cadastrados no Firestore.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-2 mb-6"> {/* Centralizado filtros e adicionado margem */}
            <button 
              className={`${activeFilter === 'all' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-4 py-2 rounded-lg text-sm transition-colors`}
              onClick={() => setActiveFilter('all')}
            >
              Todos
            </button>
            <button 
              className={`${activeFilter === 'roulette' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-4 py-2 rounded-lg text-sm transition-colors`}
              onClick={() => setActiveFilter('roulette')}
            >
              Roleta
            </button>
            <button 
              className={`${activeFilter === 'crash' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-4 py-2 rounded-lg text-sm transition-colors`}
              onClick={() => setActiveFilter('crash')}
            >
              Crash
            </button>
            <button 
              className={`${activeFilter === 'slots' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'} text-white px-4 py-2 rounded-lg text-sm transition-colors`}
              onClick={() => setActiveFilter('slots')}
            >
              Slots
            </button>
          </div>
          
          {(activeFilter === 'all' || activeFilter === 'slots') && ( // Simplificado condição
            <div className="w-full bg-gradient-to-r from-amber-500 to-red-600 rounded-xl p-6 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Série Fortune Tiger</h2>
                  <p className="text-amber-100 text-sm lg:text-base">Experimente os jogos mais populares inspirados na linha Fortune Tiger da PG Soft!</p>
                </div>
                <div>
                  <button 
                    className="bg-white text-amber-700 hover:bg-amber-100 px-6 py-3 rounded-lg font-semibold shadow-md transition-transform hover:scale-105"
                    onClick={() => setActiveFilter('slots')}
                  >
                    Ver Slots
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Ajustado para responsividade */}
            {filteredGames.length > 0 ? (
              filteredGames.map((game: Game, index: number) => {
                // Log para cada jogo antes de renderizar o GameCard
                console.log(`Games.tsx: Renderizando GameCard para o jogo ${index} (ID: ${game?.id || 'ID INDEFINIDO!'})`, JSON.stringify(game, null, 2));
                if (!game || !game.id) { // Verificação adicional
                    console.error(`Games.tsx: Jogo inválido ou sem ID no índice ${index} da lista filteredGames. Jogo:`, game);
                    return <div key={`invalid-game-${index}`} className="text-red-500 p-4 border border-red-500 rounded-lg">Jogo inválido no índice {index}</div>;
                }
                return <GameCard key={game.id} game={game} />;
              })
            ) : (
              !loading && ( // Só mostra "Nenhum jogo" se não estiver carregando
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-400 text-lg">Nenhum jogo disponível para o filtro selecionado.</p>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Games;