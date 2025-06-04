import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Trophy, Clock, Award, User } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  username: string;
  minutes: number;
  totalWon: number;
  level: number;
  rank?: number;
  isCurrentUser?: boolean;
  avatarUrl?: string; // Adicionado campo para URL do avatar
}

const Leaderboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [activeTab, setActiveTab] = useState<'minutes' | 'won' | 'level'>('minutes');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock leaderboard data
    const generateLeaderboard = () => {
      const users: LeaderboardUser[] = [];
      
      // Generate 20 random users
      for (let i = 0; i < 20; i++) {
        users.push({
          id: `user-${i}`,
          username: `Player${i + 1}`,
          minutes: Math.floor(Math.random() * 1000) + 50,
          totalWon: Math.floor(Math.random() * 5000) + 100,
          level: Math.floor(Math.random() * 30) + 1,
          avatarUrl: `https://api.dicebear.com/8.x/bottts/svg?seed=Player${i + 1}&size=32`
        });
      }
      
      // Add current user if available
      if (currentUser) {
        const userIndex = Math.floor(Math.random() * users.length);
        users[userIndex] = {
          ...users[userIndex],
          id: currentUser.uid,
          username: currentUser.displayName || 'Você',
          isCurrentUser: true,
          // Idealmente, viria do userProfile, mas para mock, geramos um também
          avatarUrl: `https://api.dicebear.com/8.x/bottts/svg?seed=${currentUser.displayName || 'User'}&size=32` 
        };
      }
      
      setLeaderboardData(users);
      setIsLoading(false);
    };
    
    setTimeout(generateLeaderboard, 1000); // Simulate loading
  }, [currentUser]);

  const sortLeaderboard = () => {
    let sorted = [...leaderboardData];
    
    if (activeTab === 'minutes') {
      sorted.sort((a, b) => b.minutes - a.minutes);
    } else if (activeTab === 'won') {
      sorted.sort((a, b) => b.totalWon - a.totalWon);
    } else {
      sorted.sort((a, b) => b.level - a.level);
    }
    
    // Add rank to each user
    sorted = sorted.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
    
    return sorted;
  };

  const sortedLeaderboard = sortLeaderboard();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Ranking</h1>
        
        <div className="flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('minutes')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'minutes'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
          }`}
          >
            Minutos
          </button>
          <button
            onClick={() => setActiveTab('won')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === 'won' ? 'bg-purple-600 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white hover:scale-105'} focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95`}
          >
            Ganhos
          </button>
          <button
            onClick={() => setActiveTab('level')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === 'level' ? 'bg-purple-600 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white hover:scale-105'} focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95`}
          >
            Nível
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          {/* Cabeçalhos da Tabela Visíveis em Telas Maiores */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-700 text-xs font-semibold text-gray-400 sticky top-0 bg-gray-800 z-10">
            <div className="col-span-1 text-center">Pos.</div>
            <div className="col-span-5">Jogador</div>
            <div className="col-span-2 text-right">
              {activeTab === 'minutes' ? 'Minutos' : activeTab === 'won' ? 'Ganhos' : 'Nível'}
            </div>
            <div className="col-span-4">Medalha</div>
          </div>

          {/* Cabeçalhos da Tabela Visíveis em Telas Menores (empilhados ou simplificados) */}
          {/* Esta é uma abordagem. Pode ser necessário ajustar para o layout exato desejado em mobile. */}
          <div className="md:hidden grid grid-cols-3 gap-2 p-2 bg-gray-700 text-gray-300 font-medium text-xs">
            <div className="col-span-1">Jogador</div>
            <div className="col-span-1 text-center">{activeTab === 'minutes' ? 'Min.' : activeTab === 'won' ? 'Ganhos' : 'Nível'}</div>
            <div className="col-span-1 text-right">Medalha</div>
          </div>
          
          <div className="divide-y divide-gray-700">
            {sortedLeaderboard.map((user) => (
              <div
                key={user.id}
                className={`grid grid-cols-12 gap-4 px-4 py-3 items-center transition-all duration-200 ${
                  user.isCurrentUser
                    ? 'bg-purple-900 bg-opacity-40 md:scale-102 shadow-lg'
                    : 'hover:bg-gray-700 hover:bg-opacity-50'
                } md:grid`}
              >
                {/* Coluna Posição (Rank) */}
                <div className="col-span-1 text-center font-semibold text-white hidden md:block">
                  {user.rank}
                </div>
                
                {/* Coluna Jogador (Avatar e Nome) - Ajustado para melhor responsividade */}
                <div className="col-span-full md:col-span-5 flex items-center">
                  <div className="md:hidden w-6 text-center font-semibold text-white mr-2">{user.rank}.</div> {/* Rank para mobile */} 
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold overflow-hidden mr-2 md:mr-3 shadow-md ${user.isCurrentUser ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-gray-600'}`}
                  >
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                    ) : user.username ? (
                      <span>{user.username.charAt(0).toUpperCase()}</span>
                    ) : (
                      <User className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <span className={`${user.isCurrentUser ? 'text-purple-400 font-medium' : 'text-white'} truncate`}>
                    {user.username} {user.isCurrentUser && <span className="hidden md:inline">(Você)</span>}
                  </span>
                </div>
                
                {/* Coluna de Stats (Minutos/Ganhos/Nível) */}
                <div className="col-span-full md:col-span-2 flex items-center justify-end md:justify-end text-xs md:text-sm">
                  {activeTab === 'minutes' && (
                    <div className="flex items-center text-white">
                      <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 text-purple-400" />
                      {user.minutes}
                    </div>
                  )}
                  {activeTab === 'won' && (
                    <div className="flex items-center text-white">
                      <Trophy className="h-3 w-3 md:h-4 md:w-4 mr-1 text-yellow-500" />
                      {user.totalWon}
                    </div>
                  )}
                  {activeTab === 'level' && (
                    <div className="flex items-center text-white">
                      <Award className="h-3 w-3 md:h-4 md:w-4 mr-1 text-blue-400" />
                      {user.level}
                    </div>
                  )}
                </div>
                
                {/* Coluna Medalha */}
                <div className="col-span-full md:col-span-4 flex justify-end md:justify-start">
                  {user.rank === 1 && (
                    <div className="bg-yellow-900 bg-opacity-30 text-yellow-400 text-xs rounded-full px-2 py-1 md:px-3 inline-flex items-center">
                      <Trophy className="h-3 w-3 mr-1" />
                      Mestre do Tempo
                    </div>
                  )}
                  {user.rank === 2 && (
                    <div className="bg-gray-600 bg-opacity-30 text-gray-300 text-xs rounded-full px-2 py-1 md:px-3 inline-flex items-center">
                      <Trophy className="h-3 w-3 mr-1" />
                      Expert do Tempo
                    </div>
                  )}
                  {user.rank === 3 && (
                    <div className="bg-yellow-800 bg-opacity-30 text-yellow-600 text-xs rounded-full px-2 py-1 md:px-3 inline-flex items-center">
                      <Trophy className="h-3 w-3 mr-1" />
                      Entusiasta do Tempo
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recompensas do Ranking</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-900 bg-opacity-30 p-4 rounded-lg border border-yellow-800">
            <h3 className="font-medium text-yellow-400 mb-2">1º Lugar</h3>
            <p className="text-gray-300 text-sm">
              <span className="block font-bold text-white">+200 minutos</span>
              Mestre do Tempo exibida no seu perfil
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <h3 className="font-medium text-gray-300 mb-2">2º Lugar</h3>
            <p className="text-gray-300 text-sm">
              <span className="block font-bold text-white">+100 minutos</span>
              Expert do Tempo exibida no seu perfil
            </p>
          </div>
          <div className="bg-yellow-800 bg-opacity-30 p-4 rounded-lg border border-yellow-900">
            <h3 className="font-medium text-yellow-600 mb-2">3º Lugar</h3>
            <p className="text-gray-300 text-sm">
              <span className="block font-bold text-white">+50 minutos</span>
              Entusiasta do Tempo exibida no seu perfil
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;