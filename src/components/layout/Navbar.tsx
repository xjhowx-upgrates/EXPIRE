import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Gamepad2, 
  Trophy, 
  User, 
  LogOut, 
  Moon, 
  Sun,
  Crown,
  Settings
} from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import { TimeDisplay } from '../ui/TimeDisplay'

export const Navbar: React.FC = () => {
  const { user, profile, signOut } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navItems = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/games', icon: Gamepad2, label: 'Jogos' },
    { to: '/achievements', icon: Trophy, label: 'Conquistas' },
    { to: '/leaderboard', icon: Crown, label: 'Ranking' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">E</span>
            </motion.div>
            <span className="text-white font-bold text-xl">EXPIRE</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user && <TimeDisplay />}
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {user ? (
              <div className="flex items-center gap-3">
                {/* User Menu */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block">
                    {profile?.username || profile?.full_name || 'Perfil'}
                  </span>
                </Link>

                {/* Sign Out */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}