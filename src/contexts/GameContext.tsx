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

const penaltyVideoId = 'IobwwOUJkFk';

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWatchingVideo, setIsWatchingVideo] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const { currentUser, userProfile } = useAuth();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log("GameContext: Iniciando busca de jogos..."); // Log Adicionado
        const gamesCollection = collection(db, 'games');
        const gamesSnapshot = await getDocs(gamesCollection);
        console.log(`GameContext: Encontrados ${gamesSnapshot.docs.length} documentos de jogos.`); // Log Adicionado

        const gamesList = gamesSnapshot.docs.map((docSnapshot, index) => {
          const rawData = docSnapshot.data();
          // Log detalhado dos dados brutos de cada documento
          console.log(`GameContext: Dados brutos do Firestore para o jogo ${index} (ID: ${docSnapshot.id}):`, JSON.stringify(rawData, null, 2));
          
          const gameData = {
            id: docSnapshot.id,
            ...rawData
          };
          // Log dos dados mapeados antes da asserção de tipo
          console.log(`GameContext: Dados mapeados para o jogo ${index} (ID: ${docSnapshot.id}) antes da asserção:`, JSON.stringify(gameData, null, 2));
          return gameData;
        }) as Game[];
        
        console.log('GameContext: Lista final de jogos (gamesList) a ser definida no estado:', JSON.stringify(gamesList, null, 2)); // Log Adicionado
        setGames(gamesList);
      } catch (error) {
        console.error('GameContext: Erro ao buscar jogos:', error);
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
      
      const isWin = Math.random() < 0.3;
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      if (isWin) {
        await updateDoc(userDocRef, {
          minutes: increment(amount),
          totalWon: increment(amount),
          gamesPlayed: increment(1)
        });
      } else {
        await updateDoc(userDocRef, {
          minutes: increment(-amount),
          totalLost: increment(amount),
          gamesPlayed: increment(1)
        });
        setCurrentVideoId(penaltyVideoId);
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
      const minutesRewarded = Math.floor(Math.random() * 10) + 5;
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