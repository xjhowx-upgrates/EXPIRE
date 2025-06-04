import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

export interface Game {
  id: string;
  name: string;
  description: string;
  minBet: number;
  maxBet: number;
  imageUrl: string;
  type: 'roulette' | 'crash' | 'slots';
  popularity: number;
}

interface GameContextType {
  games: Game[];
  loading: boolean;
  betMinutes: (gameId: string, amount: number) => Promise<boolean>;
  watchVideo: () => Promise<number>;
  isWatchingVideo: boolean;
  currentVideoId: string | null;
  setCurrentVideoId: (videoId: string | null) => void;
}

export const GameContext = createContext<GameContextType>({
  games: [],
  loading: true,
  betMinutes: async () => false,
  watchVideo: async () => 0,
  isWatchingVideo: false,
  currentVideoId: null,
  setCurrentVideoId: () => {},
});

// List of video IDs from the channel
const videoIds = [
  'dQw4w9WgXcQ', // Example YouTube video IDs
  'jNQXAC9IVRw',
  '9bZkp7q19f0',
  'kJQP7kiw5Fk',
  'fJ9rUzIMcZQ'
];

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWatchingVideo, setIsWatchingVideo] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const { currentUser, userProfile } = useAuth();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCollection = collection(db, 'games');
        const gamesSnapshot = await getDocs(gamesCollection);
        const gamesList = gamesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Game[];
        setGames(gamesList);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const betMinutes = async (gameId: string, amount: number): Promise<boolean> => {
    if (!currentUser || !userProfile) return false;
    
    try {
      if (userProfile.minutes < amount) {
        return false;
      }
      
      // Random win logic (30% chance to win)
      const isWin = Math.random() < 0.3;
      
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      if (isWin) {
        // Update user profile with winnings
        await updateDoc(userDocRef, {
          minutes: increment(amount),
          totalWon: increment(amount),
          gamesPlayed: increment(1)
        });
      } else {
        // Update user profile with losses
        await updateDoc(userDocRef, {
          minutes: increment(-amount),
          totalLost: increment(amount),
          gamesPlayed: increment(1)
        });
        
        // If user loses, they get a random video to watch
        const randomIndex = Math.floor(Math.random() * videoIds.length);
        setCurrentVideoId(videoIds[randomIndex]);
        setIsWatchingVideo(true);
      }
      
      return isWin;
    } catch (error) {
      console.error('Error placing bet:', error);
      return false;
    }
  };

  const watchVideo = async (): Promise<number> => {
    if (!currentUser) return 0;
    
    try {
      // User gets minutes for watching video
      const minutesRewarded = Math.floor(Math.random() * 10) + 5; // 5-15 minutes
      
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        minutes: increment(minutesRewarded)
      });
      
      setIsWatchingVideo(false);
      setCurrentVideoId(null);
      
      return minutesRewarded;
    } catch (error) {
      console.error('Error watching video:', error);
      return 0;
    }
  };

  const value = {
    games,
    loading,
    betMinutes,
    watchVideo,
    isWatchingVideo,
    currentVideoId,
    setCurrentVideoId
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};