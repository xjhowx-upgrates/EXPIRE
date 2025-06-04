import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft, Shield, Users, Trophy } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800/50 backdrop-blur-sm fixed w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <Clock className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-2xl font-bold text-white">MinuteBet</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Sobre a MinuteBet</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">
              A MinuteBet nasceu com uma missão única: revolucionar o conceito de
              entretenimento online criando uma plataforma onde o tempo, não o dinheiro,
              é a moeda principal.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Nossa História</h2>
            <p className="text-gray-300 mb-8">
              Fundada em 2025, a MinuteBet surgiu da ideia de criar uma alternativa
              segura e divertida às plataformas de apostas tradicionais. Nosso objetivo
              é proporcionar toda a emoção dos jogos de azar sem os riscos financeiros
              associados.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Aposte Minutos</h3>
                <p className="text-gray-300">
                  Use seus minutos como moeda virtual para apostar em diversos jogos
                  emocionantes.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Assista e Ganhe</h3>
                <p className="text-gray-300">
                  Perdeu uma aposta? Assista vídeos interessantes para recuperar seus
                  minutos.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Conquiste</h3>
                <p className="text-gray-300">
                  Desbloqueie conquistas, suba no ranking e ganhe recompensas exclusivas.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Nossos Valores</h2>
            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white mb-2">Segurança</h3>
                  <p className="text-gray-300">
                    Priorizamos a segurança dos nossos usuários, oferecendo uma
                    plataforma livre de riscos financeiros.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white mb-2">Comunidade</h3>
                  <p className="text-gray-300">
                    Construímos uma comunidade ativa e engajada, onde jogadores podem
                    interagir e competir de forma saudável.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Trophy className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white mb-2">Diversão Responsável</h3>
                  <p className="text-gray-300">
                    Promovemos o entretenimento responsável, mantendo o foco na
                    diversão e não nas apostas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Pronto para começar?
              </h2>
              <p className="text-gray-300 mb-6">
                Junte-se a milhares de jogadores e comece sua jornada na MinuteBet.
              </p>
              <Link
                to="/register"
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700"
              >
                Criar Conta Grátis
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} MinuteBet. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;