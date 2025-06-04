import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { X } from 'lucide-react';
import { useGame } from '../../hooks/useGame';

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const { watchVideo } = useGame();
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [minutesEarned, setMinutesEarned] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleVideoEnd = async () => {
    setVideoCompleted(true);
    const minutes = await watchVideo();
    setMinutesEarned(minutes);
  };

  const handleClose = () => {
    if (videoCompleted) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
      }, 500);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden max-w-3xl w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">Watch to Earn Minutes</h3>
          {videoCompleted && (
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
        
        <div className="p-4">
          <div className="aspect-video mb-4">
            <YouTube
              videoId={videoId}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              onEnd={handleVideoEnd}
            />
          </div>
          
          <div className="text-center">
            {!videoCompleted ? (
              <p className="text-gray-300">Watch the entire video to earn minutes.</p>
            ) : (
              <div className="p-4 bg-green-800 text-white rounded-lg">
                <p className="text-xl font-bold">Congratulations!</p>
                <p>You earned {minutesEarned} minutes.</p>
                <button 
                  onClick={handleClose}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  Continue Playing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;