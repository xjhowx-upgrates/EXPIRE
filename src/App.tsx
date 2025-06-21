import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './stores/authStore'
import { useTimeStore } from './stores/timeStore'
import { useThemeStore } from './stores/themeStore'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'

// Pages
import { Home } from './pages/Home'
import { Games } from './pages/Games'
import { GameDetail } from './pages/GameDetail'
import { Achievements } from './pages/Achievements'
import { Leaderboard } from './pages/Leaderboard'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { About } from './pages/About'

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  const { user, loading } = useAuthStore()
  const { initializeTime } = useTimeStore()
  const { isDark } = useThemeStore()

  useEffect(() => {
    if (user) {
      initializeTime()
    }
  }, [user])

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Inicializando EXPIRE...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
        <Navbar />
        
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
            
            {/* Protected Routes */}
            <Route path="/games" element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            } />
            <Route path="/game/:gameId" element={
              <ProtectedRoute>
                <GameDetail />
              </ProtectedRoute>
            } />
            <Route path="/achievements" element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Legal Pages */}
            <Route path="/terms" element={
              <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
                    <h1 className="text-4xl font-bold text-white mb-8">Termos de Uso</h1>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 mb-4">
                        Bem-vindo ao EXPIRE. Ao usar nossa plataforma, você concorda com os seguintes termos:
                      </p>
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Uso da Plataforma</h2>
                      <p className="text-gray-300 mb-4">
                        O EXPIRE é uma plataforma de jogos online onde o tempo é usado como moeda virtual. 
                        Você deve usar a plataforma de forma responsável e respeitosa.
                      </p>
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Conta do Usuário</h2>
                      <p className="text-gray-300 mb-4">
                        Você é responsável por manter a segurança de sua conta e senha. 
                        Não compartilhe suas credenciais com terceiros.
                      </p>
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Sistema de Tempo</h2>
                      <p className="text-gray-300 mb-4">
                        O tempo é a moeda virtual da plataforma. Cada usuário recebe tempo inicial e 
                        bônus regulares. O tempo não possui valor monetário real.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            } />
            
            <Route path="/privacy" element={
              <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
                    <h1 className="text-4xl font-bold text-white mb-8">Política de Privacidade</h1>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 mb-4">
                        Sua privacidade é importante para nós. Esta política explica como coletamos e usamos seus dados.
                      </p>
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Dados Coletados</h2>
                      <p className="text-gray-300 mb-4">
                        Coletamos apenas as informações necessárias para o funcionamento da plataforma: 
                        email, nome, estatísticas de jogos e preferências.
                      </p>
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Uso dos Dados</h2>
                      <p className="text-gray-300 mb-4">
                        Seus dados são usados exclusivamente para melhorar sua experiência na plataforma 
                        e não são compartilhados com terceiros.
                      </p>
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Segurança</h2>
                      <p className="text-gray-300 mb-4">
                        Implementamos medidas de segurança robustas para proteger seus dados pessoais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            } />
            
            {/* 404 */}
            <Route path="*" element={
              <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎮</div>
                  <h1 className="text-4xl font-bold text-white mb-4">Página não encontrada</h1>
                  <p className="text-gray-400 mb-8">A página que você está procurando não existe.</p>
                  <a
                    href="/"
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                  >
                    Voltar ao Início
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
              border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App