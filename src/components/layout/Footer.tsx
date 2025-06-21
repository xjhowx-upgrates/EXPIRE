import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Plataforma',
      links: [
        { label: 'Início', to: '/' },
        { label: 'Jogos', to: '/games' },
        { label: 'Ranking', to: '/leaderboard' },
        { label: 'Conquistas', to: '/achievements' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Termos de Uso', to: '/terms' },
        { label: 'Política de Privacidade', to: '/privacy' },
        { label: 'Sobre Nós', to: '/about' },
      ]
    },
    {
      title: 'Suporte',
      links: [
        { label: 'Central de Ajuda', to: '/help' },
        { label: 'Contato', to: '/contact' },
        { label: 'Status', to: '/status' },
      ]
    }
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/xjhowx', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/xjhowx', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contato@expire.com', label: 'Email' },
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-white font-bold text-xl">EXPIRE</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A plataforma inovadora de jogos online onde o tempo é a sua moeda principal. 
              Jogue, conquiste e domine o ranking global.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} EXPIRE. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <span>Desenvolvido com</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>por</span>
              <a
                href="https://github.com/xjhowx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                Jonathan S. (@xjhowx)
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}