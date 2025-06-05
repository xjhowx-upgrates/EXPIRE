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
        console.log("GameContext: Iniciando busca de jogos...");
        const gamesCollection = collection(db, 'games');
        const gamesSnapshot = await getDocs(gamesCollection);
        
        if (gamesSnapshot.empty) {
          console.warn('GameContext: Nenhum jogo encontrado no banco de dados.');
          setGames([]);
          return;
        }

        console.log(`GameContext: Encontrados ${gamesSnapshot.docs.length} documentos de jogos.`);

        const gamesList = gamesSnapshot.docs.map((docSnapshot, index) => {
          try {
            const rawData = docSnapshot.data();
            
            // Validação básica dos dados do jogo
            if (!rawData.name || !rawData.type) {
              console.warn(`GameContext: Jogo ${docSnapshot.id} está com dados incompletos:`, rawData);
              return null;
            }
            
            const gameData = {
              id: docSnapshot.id,
              name: rawData.name || 'Jogo sem nome',
              description: rawData.description || 'Descrição não disponível',
              minBet: typeof rawData.minBet === 'number' ? rawData.minBet : 0,
              maxBet: typeof rawData.maxBet === 'number' ? rawData.maxBet : 0,
              imageUrl: rawData.imageUrl || '',
              type: ['roulette', 'crash', 'slots'].includes(rawData.type) 
                ? rawData.type as 'roulette' | 'crash' | 'slots' 
                : 'slots', // Default para slots se o tipo for inválido
              popularity: typeof rawData.popularity === 'number' ? rawData.popularity : 0,
            };
            
            return gameData;
          } catch (error) {
            console.error(`GameContext: Erro ao processar jogo ${docSnapshot.id}:`, error);
            return null;
          }
        }).filter(Boolean) as Game[]; // Remove entradas nulas
        
        if (gamesList.length === 0) {
          console.error('GameContext: Nenhum jogo válido encontrado após o processamento.');
        } else {
          console.log(`GameContext: ${gamesList.length} jogos carregados com sucesso.`);
        }
        
        setGames(gamesList);
      } catch (error) {
        console.error('GameContext: Erro ao buscar jogos:', error);
        // Em produção, você pode querer mostrar uma mensagem amigável para o usuário
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