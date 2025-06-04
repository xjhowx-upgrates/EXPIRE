import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Github, Twitter, Gamepad2, Trophy } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="flex items-center transition-all duration-200 hover:scale-105">
              <Clock className="h-6 w-6 text-purple-500 transition-colors duration-200 group-hover:text-purple-400" />
              <span className="ml-2 text-lg font-bold text-white tracking-wide">EXPIRE</span>
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-center text-sm text-gray-400 md:text-right">
              &copy; {new Date().getFullYear()} EXPIRE. Todos os direitos reservados.<br />
              <span className="text-xs block">
                Jogue com responsabilidade. Aposte apenas o tempo que estiver disposto a perder.
              </span>
              <span className="text-xs block mt-2 text-gray-500">
                Dev.: <a href="https://github.com/xjhowx" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400">@xjhowx</a> &bull; Avatares por <a href="https://www.dicebear.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400">DiceBear</a> &bull; Ícones por <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400">Lucide</a>
              </span>
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-6 md:justify-end">
          <Link to="/app/jogos" className="flex items-center text-gray-400 hover:text-gray-300">
            <Gamepad2 className="h-5 w-5 mr-1" />
            <span>Jogos</span>
          </Link>
          <Link to="/app/ranking" className="flex items-center text-gray-400 hover:text-gray-300">
            <Trophy className="h-5 w-5 mr-1" />
            <span>Ranking</span>
          </Link>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;