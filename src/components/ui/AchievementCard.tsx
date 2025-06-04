import React from 'react';

interface AchievementCardProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: string;
    isUnlocked: boolean;
    progress?: number;
    maxProgress?: number;
  };
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { name, description, icon, isUnlocked, progress, maxProgress } = achievement;
  
  return (
    <div className={`relative p-4 rounded-xl shadow-md transition-all duration-200 ${isUnlocked ? 'bg-gray-800 hover:shadow-xl hover:scale-105 cursor-pointer' : 'bg-gray-800 bg-opacity-50 opacity-70'} focus-within:ring-2 focus-within:ring-purple-400`}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${isUnlocked ? 'bg-purple-600' : 'bg-gray-700'}`}>
          <img src={icon} alt={name} className="w-8 h-8" />
        </div>
        
        <div>
          <h3 className={`font-medium ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>{name}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
          
          {progress !== undefined && maxProgress !== undefined && (
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, (progress / maxProgress) * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{progress} / {maxProgress}</p>
            </div>
          )}
        </div>
      </div>
      
      {isUnlocked && (
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
          Unlocked
        </div>
      )}
    </div>
  );
};

export default AchievementCard;