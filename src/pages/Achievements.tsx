import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import AchievementCard from '../components/ui/AchievementCard';

const Achievements: React.FC = () => {
  const { userProfile } = useAuth();
  const [achievements, setAchievements] = useState<any[]>([]);
  const [unlockedCount, setUnlockedCount] = useState(0);

  // Mock achievements
  useEffect(() => {
    if (userProfile) {
      const userAchievements = [
        {
          id: 'first-bet',
          name: 'Primeira Aposta',
          description: 'Faça sua primeira aposta',
          icon: 'https://via.placeholder.com/80?text=🎲',
          isUnlocked: userProfile.gamesPlayed > 0,
        },
        {
          id: 'time-master',
          name: 'Mestre do Tempo',
          description: 'Acumule 500 minutos em seu saldo',
          icon: 'https://via.placeholder.com/80?text=⏰',
          isUnlocked: userProfile.minutes >= 500,
          progress: Math.min(userProfile.minutes, 500),
          maxProgress: 500,
        },
        {
          id: 'big-winner',
          name: 'Grande Vencedor',
          description: 'Ganhe 1000 minutos no total',
          icon: 'https://via.placeholder.com/80?text=💰',
          isUnlocked: userProfile.totalWon >= 1000,
          progress: Math.min(userProfile.totalWon, 1000),
          maxProgress: 1000,
        },
        {
          id: 'regular-player',
          name: 'Jogador Regular',
          description: 'Jogue 50 partidas',
          icon: 'https://via.placeholder.com/80?text=🎮',
          isUnlocked: userProfile.gamesPlayed >= 50,
          progress: Math.min(userProfile.gamesPlayed, 50),
          maxProgress: 50,
        },
        {
          id: 'high-roller',
          name: 'Apostador de Elite',
          description: 'Faça uma aposta de 100 minutos ou mais',
          icon: 'https://via.placeholder.com/80?text=🌟',
          isUnlocked: false,
        },
        {
          id: 'comeback-kid',
          name: 'Rei da Virada',
          description: 'Vença após perder 3 partidas seguidas',
          icon: 'https://via.placeholder.com/80?text=🔄',
          isUnlocked: false,
        },
        {
          id: 'video-watcher',
          name: 'Entusiasta de Vídeos',
          description: 'Assista a 10 vídeos',
          icon: 'https://via.placeholder.com/80?text=📺',
          isUnlocked: false,
          progress: 0,
          maxProgress: 10,
        },
        {
          id: 'lucky-seven',
          name: 'Sete da Sorte',
          description: 'Vença 7 vezes seguidas',
          icon: 'https://via.placeholder.com/80?text=🍀',
          isUnlocked: false,
        },
      ];
      
      setAchievements(userAchievements);
      setUnlockedCount(userAchievements.filter(a => a.isUnlocked).length);
    }
  }, [userProfile]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Conquistas</h1>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Seu Progresso</h2>
            <p className="text-gray-400">Desbloqueie conquistas para ganhar minutos bônus e status especial!</p>
          </div>
          <div className="bg-gray-700 px-4 py-2 rounded-lg">
            <span className="text-purple-400 font-bold">{unlockedCount}</span>
            <span className="text-gray-300"> / {achievements.length} desbloqueadas</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
          <div 
            className="bg-purple-600 h-3 rounded-full transition-all duration-1000" 
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Benefícios das Conquistas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer">
            <h3 className="font-medium text-white mb-2">Minutos Bônus</h3>
            <p className="text-gray-400 text-sm">Ao conquistar objetivos, você ganha minutos extras para apostar.</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer">
            <h3 className="font-medium text-white mb-2">Status Especial</h3>
            <p className="text-gray-400 text-sm">Ganhe emblemas e status exclusivos exibidos no seu perfil e no ranking.</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer">
            <h3 className="font-medium text-white mb-2">Desbloquear Recursos</h3>
            <p className="text-gray-400 text-sm">Algumas conquistas liberam recursos e modos de jogo especiais.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;