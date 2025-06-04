import React from 'react';
import { Clock } from 'lucide-react';

interface MinuteBalanceProps {
  minutes: number;
}

const MinuteBalance: React.FC<MinuteBalanceProps> = ({ minutes }) => {
  return (
    <div className="flex items-center bg-gray-700 px-3 py-1 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-150 focus-within:ring-2 focus-within:ring-purple-400 cursor-pointer">
      <Clock className="h-4 w-4 text-purple-400 mr-1" />
      <span className="text-sm font-medium text-white">{minutes} min</span>
    </div>
  );
};

export default MinuteBalance;