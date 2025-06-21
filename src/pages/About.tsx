import React from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Trophy, 
  Users, 
  Zap, 
  Target, 
  Star,
  Heart,
  Code,
  Gamepad2
} from 'lucide-react'

export const About: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Tempo como Moeda',
      description: 'Sistema inovador onde o tempo é sua moeda principal. Cada jogo consome tempo, criando uma experiência única de gerenciamento de recursos.',
    },
    {
      icon: Trophy,
      title: 'Sistema de Conquistas',
      description: 'Desbloqueie conquistas únicas em 4 raridades diferentes: Comum, Raro, Épico e Lendário. Cada conquista oferece pontos extras.',
    },
    {
      icon: Users,
      title: 'Ranking Global',
      description: 'Compete com jogadores do mundo todo em um ranking dinâmico que atualiza em tempo real baseado em pontos e conquistas.',
    },
    {
      icon: Gamepad2,
      title: '6 Jogos Únicos',
      description: 'Slot Machine, Crash Game, Roleta, Sweet Bonanza, Campo Minado e Blackjack - cada um com mecânicas únicas e custos de tempo específicos.',
    },
  ]

  const stats = [
    { label: 'Jogos Disponíveis', value: '6', icon: Gamepad2 },
    { label: 'Conquistas', value: '8', icon: Trophy },
    { label: 'Tempo Inicial', value: '120min', icon: Clock },
    { label: 'Bônus por Hora', value: '+10min', icon: Zap },
  ]

  const team = [
    {
      name: 'Jonathan S.',
      role: 'Desenvolvedor Full-Stack',
      github: '@xjhowx',
      description: 'Criador e desenvolvedor principal do EXPIRE. Especialista em React, TypeScript e Supabase.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Sobre o{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                EXPIRE
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Uma plataforma inovadora de jogos online onde o tempo é a moeda principal, 
              criando uma experiência única de entretenimento e estratégia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            <div className="text-center mb-8">
              <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Nossa Missão</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  O EXPIRE foi criado com o objetivo de revolucionar a experiência de jogos online, 
                  introduzindo um conceito único onde o tempo se torna a moeda principal.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Queremos criar uma plataforma onde cada decisão importa, onde o gerenciamento 
                  de recursos é fundamental, e onde a diversão encontra a estratégia.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="text-white">Inovação em jogos online</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-400" />
                  <span className="text-white">Experiência do usuário premium</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="w-6 h-6 text-blue-400" />
                  <span className="text-white">Tecnologia de ponta</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-green-400" />
                  <span className="text-white">Comunidade global</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Características Principais
            </h2>
            <p className="text-xl text-gray-300">
              O que torna o EXPIRE único
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              EXPIRE em Números
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30"
          >
            <div className="text-center mb-8">
              <Code className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Tecnologia</h2>
              <p className="text-gray-300 text-lg">
                Construído com as melhores tecnologias modernas
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">React 18</div>
                <div className="text-gray-400 text-sm">Frontend Framework</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">TypeScript</div>
                <div className="text-gray-400 text-sm">Type Safety</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 mb-2">Supabase</div>
                <div className="text-gray-400 text-sm">Backend & Database</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-2">Tailwind CSS</div>
                <div className="text-gray-400 text-sm">Styling</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Equipe
            </h2>
            <p className="text-xl text-gray-300">
              Conheça quem está por trás do EXPIRE
            </p>
          </motion.div>

          <div className="flex justify-center">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 max-w-md"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">J</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-purple-400 mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.github}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Entre em Contato
            </h2>
            <p className="text-gray-300 mb-8">
              Tem alguma dúvida ou sugestão? Adoraríamos ouvir você!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:contato@expire.com"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                Enviar Email
              </a>
              <a
                href="https://github.com/xjhowx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-all"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}