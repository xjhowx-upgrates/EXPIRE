import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';
import Footer from '../components/navigation/Footer';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';
import VideoPlayer from '../components/games/VideoPlayer';

const MainLayout: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const { isWatchingVideo, currentVideoId } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
      
      {isWatchingVideo && currentVideoId && (
        <VideoPlayer videoId={currentVideoId} />
      )}
    </div>
  );
};

export default MainLayout;