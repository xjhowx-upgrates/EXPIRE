import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Trophy, Shield, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm fixed w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-2xl font-bold text-white">EXPIRE</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-white">
                Entrar
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Criar Conta
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8">
            Aposte seu <span className="text-purple-500">tempo</span>,<br />
            não seu dinheiro
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Uma nova forma de diversão onde você aposta minutos do seu tempo.
            Ganhe conquistas, suba no ranking e divirta-se de forma responsável.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 flex items-center justify-center"
            >
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/sobre"
              className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-700 flex items-center justify-center"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Por que escolher a EXPIRE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                100% Seguro
              </h3>
              <p className="text-gray-300">
                Sem riscos financeiros. Aposte apenas seu tempo e divirta-se com responsabilidade.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Comunidade Ativa
              </h3>
              <p className="text-gray-300">
                Milhares de jogadores online. Faça amigos e compare seus resultados.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Conquistas
              </h3>
              <p className="text-gray-300">
                Desbloqueie conquistas especiais e suba no ranking global.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-500" />
                <span className="ml-2 text-xl font-bold text-white">EXPIRE</span>
              </div>
              <p className="mt-4 text-gray-400">
                A nova forma de diversão online.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/sobre" className="text-gray-400 hover:text-white">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link to="/app/jogos" className="text-gray-400 hover:text-white">
                    Jogos
                  </Link>
                </li>
                <li>
                  <Link to="/app/ranking" className="text-gray-400 hover:text-white">
                    Ranking
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/termos" className="text-gray-400 hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/privacidade" className="text-gray-400 hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Contato</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:suporte@expire.com" className="text-gray-400 hover:text-white">
                    suporte@expire.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} EXPIRE. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;