import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Games from './pages/Games';
import Game from './pages/Game';
import GameDetails from './pages/GameDetails';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
            {/* Rotas diretas para games e leaderboard */}
            <Route path="/games" element={<Games />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/app" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="jogos" element={<Games />} />
              <Route path="jogos/:gameId" element={<Game />} />
              <Route path="jogos/detalhes/:gameId" element={<GameDetails />} />
              <Route path="ranking" element={<Leaderboard />} />
              <Route path="conquistas" element={<Achievements />} />
              <Route path="perfil" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </GameProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;