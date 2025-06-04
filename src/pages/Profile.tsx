import React, { useState, Dispatch, SetStateAction } from 'react';
import { Clock, Trophy, Gamepad2, Award, User, Gem, Calendar, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/ui/StatCard';

type ProfileTab = 'stats' | 'achievements' | 'history';

const Profile = () => {
  const { userProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>('stats');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  if (!userProfile) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Calculate XP progress
  const xpForNextLevel = userProfile.level * 100;
  const xpProgress = (userProfile.experience / xpForNextLevel) * 100;

  // Mock game history
  const gameHistory = [
    { id: 1, game: 'Roulette', result: 'Win', amount: 25, date: '2025-01-15 14:30' },
    { id: 2, game: 'Crash', result: 'Loss', amount: -15, date: '2025-01-15 14:25' },
    { id: 3, game: 'Fortune Tiger', result: 'Win', amount: 50, date: '2025-01-15 14:15' },
    { id: 4, game: 'Roulette', result: 'Loss', amount: -10, date: '2025-01-15 13:45' },
    { id: 5, game: 'Crash', result: 'Loss', amount: -20, date: '2025-01-15 13:30' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden text-white text-4xl md:text-5xl font-semibold shadow-lg">
            {userProfile.avatarUrl ? (
              <img src={userProfile.avatarUrl} alt={userProfile.username} className="w-full h-full object-cover" />
            ) : userProfile.username ? (
              <span>{userProfile.username.charAt(0).toUpperCase()}</span>
            ) : (
              <User className="h-12 w-12 md:h-16 md:h-16 text-purple-400" />
            )}
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">{userProfile.username}</h1>
            <p className="text-gray-300">Membro desde {new Date(userProfile.createdAt).toLocaleDateString('pt-BR')}</p>
            
            <div className="mt-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-1">
                <Gem className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-gray-300">Nível {userProfile.level}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-300">{userProfile.totalWon} minutos ganhos</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Gamepad2 className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">{userProfile.gamesPlayed} jogos disputados</span>
              </div>
            </div>
            
            <div className="mt-2 w-full max-w-md">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>XP: {userProfile.experience}/{xpForNextLevel}</span>
                <span>Próximo Nível: {userProfile.level + 1}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="md:ml-auto">
            <button 
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'stats'
                ? 'text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Estatísticas
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'achievements'
                ? 'text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Conquistas
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'history'
                ? 'text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Histórico
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  title="Nível Atual" 
                  value={`${userProfile.minutes} min`} 
                  icon={<Clock className="h-6 w-6 text-purple-400" />} 
                  color="bg-purple-900"
                />
                <StatCard 
                  title="Minutos Totais" 
                  value={userProfile.gamesPlayed.toString()} 
                  icon={<Gamepad2 className="h-6 w-6 text-blue-400" />} 
                  color="bg-blue-900"
                />
                <StatCard 
                  title="Minutos Ganho" 
                  value={`${userProfile.totalWon} min`} 
                  icon={<Trophy className="h-6 w-6 text-green-400" />} 
                  color="bg-green-900"
                />
                <StatCard 
                  title="Minutos Perdido" 
                  value={`${userProfile.totalLost} min`} 
                  icon={<Clock className="h-6 w-6 text-red-400" />} 
                  color="bg-red-900"
                />
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200">
                <h3 className="text-lg font-medium text-white mb-4">Estatísticas Detalhadas</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Taxa de Vitória</span>
                      <span>
                        {userProfile.gamesPlayed > 0 
                          ? `${Math.round((userProfile.totalWon / (userProfile.totalWon + userProfile.totalLost)) * 100)}%` 
                          : '0%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: userProfile.gamesPlayed > 0 
                            ? `${Math.round((userProfile.totalWon / (userProfile.totalWon + userProfile.totalLost)) * 100)}%` 
                            : '0%' 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Eficiência de Minutos</span>
                      <span>
                        {userProfile.totalWon - userProfile.totalLost} min
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${userProfile.totalWon >= userProfile.totalLost ? 'bg-green-600' : 'bg-red-600'}`}
                        style={{ 
                          width: `${Math.min(100, Math.abs((userProfile.totalWon - userProfile.totalLost) / Math.max(1, userProfile.totalWon + userProfile.totalLost)) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Conquistas Recentes</h3>
                  <span className="text-sm text-gray-400">2/8 Conquistas</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-3">
                    <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden text-white text-4xl md:text-5xl font-semibold shadow-lg">
                      {userProfile.avatarUrl ? (
                        <img src={userProfile.avatarUrl} alt={userProfile.username} className="w-full h-full object-cover" />
                      ) : userProfile.username ? (
                        <span>{userProfile.username.charAt(0).toUpperCase()}</span>
                      ) : (
                        <User className="h-12 w-12 md:h-16 md:h-16 text-purple-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Primeira Aposta</h4>
                      <p className="text-gray-400 text-sm">Faça sua primeira aposta</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-3">
                    <div className="bg-purple-700 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Economizador de Tempo</h4>
                      <p className="text-gray-400 text-sm">Acumule 100 minutos</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Em Progresso</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-700 p-2 rounded-full">
                          <Trophy className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Grande Vencedor</h4>
                          <p className="text-gray-400 text-sm">Ganhe 1000 minutos totais</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{userProfile.totalWon}/1000</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (userProfile.totalWon / 1000) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-700 p-2 rounded-full">
                          <Gamepad2 className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Jogador Regular</h4>
                          <p className="text-gray-400 text-sm">Jogue 50 jogos</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{userProfile.gamesPlayed}/50</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (userProfile.gamesPlayed / 50) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white mb-4">Atividade Recente</h3>
                <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                  Ver Tudo <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <div className="overflow-hidden bg-gray-700 rounded-lg">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Jogo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Resultado
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Quantia
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700 divide-y divide-gray-600">
                    {gameHistory.map((game) => (
                      <tr key={game.id} className="hover:bg-gray-600 hover:scale-[1.01] transition-all duration-150 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {game.game}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === 'history' ? 'bg-purple-600 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white hover:scale-105'} focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95`}>
                            {game.result === 'Vitória' ? 'Vitória' : 'Derrota'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={game.amount > 0 ? 'text-green-400' : 'text-red-400'}>
                            {game.amount > 0 ? `+${game.amount}` : game.amount} min
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {game.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200">
                <h3 className="text-lg font-medium text-white mb-4">Preferências de Jogo</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Roulette</span>
                      <span>40%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: '40%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Crash</span>
                      <span>35%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: '35%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Fortune Tiger</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-yellow-600 h-2 rounded-full" 
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;