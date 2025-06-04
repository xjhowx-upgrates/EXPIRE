import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Trophy, Award } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700 shadow-xl">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavLink
            to="/app"
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all duration-200 font-semibold text-base ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md scale-105'
                  : 'text-gray-300 hover:bg-gray-700 hover:scale-105 hover:shadow-lg'
              } focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95`
            }
          >
            <Home className="h-5 w-5 mr-3" />
            <span>Início</span>
          </NavLink>
          
          <NavLink
            to="/app/jogos"
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all duration-200 font-semibold text-base ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md scale-105'
                  : 'text-gray-300 hover:bg-gray-700 hover:scale-105 hover:shadow-lg'
              } focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95`
            }
          >
            <Gamepad2 className="h-5 w-5 mr-3" />
            <span>Jogos</span>
          </NavLink>
          
          <NavLink
            to="/app/ranking"
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all duration-200 font-semibold text-base ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md scale-105'
                  : 'text-gray-300 hover:bg-gray-700 hover:scale-105 hover:shadow-lg'
              } focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95`
            }
          >
            <Trophy className="h-5 w-5 mr-3" />
            <span>Ranking</span>
          </NavLink>
          
          <NavLink
            to="/app/conquistas"
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all duration-200 font-semibold text-base ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md scale-105'
                  : 'text-gray-300 hover:bg-gray-700 hover:scale-105 hover:shadow-lg'
              } focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95`
            }
          >
            <Award className="h-5 w-5 mr-3" />
            <span>Conquistas</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;