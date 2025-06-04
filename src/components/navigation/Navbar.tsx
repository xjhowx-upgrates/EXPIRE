import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Clock, User, Menu, X } from 'lucide-react';
import MinuteBalance from "../ui/MinuteBalance";
import { useAuth } from "../../hooks/useAuth";
import { useVersionChecker } from "../../hooks/useVersionChecker";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentUser, userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const updateAvailable = useVersionChecker();

  return (
    <>
      {updateAvailable && (
        <div className="w-full bg-yellow-400 text-yellow-900 text-center py-2 px-4 font-medium shadow-lg fixed top-0 left-0 z-50 animate-fade-in">
          Nova versão disponível! <button onClick={() => window.location.reload()} className="underline font-semibold hover:text-yellow-700 transition-colors ml-2">Clique para atualizar</button>
        </div>
      )}
      <nav className="bg-gray-800 border-b border-gray-700 mt-0" style={updateAvailable ? { marginTop: '48px' } : {}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={currentUser ? "/app" : "/"} className="flex items-center transition-all duration-200 hover:scale-105">
              <Clock className="h-8 w-8 text-purple-500 transition-colors duration-200 group-hover:text-purple-400" />
              <span className="ml-2 text-xl font-bold text-white tracking-wide">EXPIRE</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {currentUser && userProfile && (
                <>
                  <MinuteBalance minutes={userProfile.minutes} />
                  <div className="relative group">
                    <button className="flex items-center text-gray-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95">
                      {userProfile.avatarUrl ? (
                        <img src={userProfile.avatarUrl} alt={userProfile.username} className="h-6 w-6 rounded-full mr-2 shadow-md group-hover:scale-110 transition-all duration-200" />
                      ) : (
                        <User className="h-5 w-5 mr-1" />
                      )}
                      <span>{userProfile.username}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-2xl py-2 z-20 opacity-0 group-hover:opacity-100 group-hover:scale-105 transform transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 hover:text-white rounded-md transition-all duration-150 focus:outline-none focus:bg-purple-800">Perfil</Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-700 hover:text-white rounded-md transition-all duration-150 focus:outline-none focus:bg-purple-800"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/app" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Início</Link>
            <Link to="/app/jogos" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-purple-700 hover:text-white transition-all duration-150 focus:outline-none focus:bg-purple-800">Jogos</Link>
            <Link to="/app/ranking" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-purple-700 hover:text-white transition-all duration-150 focus:outline-none focus:bg-purple-800">Ranking</Link>
            <Link to="/app/conquistas" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-purple-700 hover:text-white transition-all duration-150 focus:outline-none focus:bg-purple-800">Conquistas</Link>
          </div>
          
          {currentUser && userProfile && (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  {userProfile.avatarUrl ? (
                    <img src={userProfile.avatarUrl} alt={userProfile.username} className="h-10 w-10 rounded-full shadow-md transition-all duration-200" />
                  ) : (
                    <User className="h-10 w-10 rounded-full bg-gray-700 p-2 text-gray-300" />
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{userProfile.username}</div>
                  <MinuteBalance minutes={userProfile.minutes} />
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link to="/profile" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-purple-700 hover:text-white transition-all duration-150 focus:outline-none focus:bg-purple-800">Perfil</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-purple-700 hover:text-white transition-all duration-150 focus:outline-none focus:bg-purple-800"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// CSS para animação fade-in (opcional, pode ser colocado em index.css)
// .animate-fade-in { animation: fadeIn 0.5s; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }