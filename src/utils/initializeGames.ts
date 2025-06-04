import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { slotGames } from '../data/slotGames';

/**
 * Inicializa os jogos de slots no Firestore
 * Esta função verifica se os jogos já existem antes de adicioná-los
 */
export const initializeGames = async () => {
  try {
    console.log('Iniciando a adição de jogos ao Firestore...');
    const gamesCollection = collection(db, 'games');
    
    // Para cada jogo na lista de slots
    for (const game of slotGames) {
      // Verifica se o jogo já existe (pelo nome)
      const existingGameQuery = query(gamesCollection, where('name', '==', game.name));
      const existingGameSnapshot = await getDocs(existingGameQuery);
      
      // Se o jogo não existir, adiciona ao Firestore
      if (existingGameSnapshot.empty) {
        await addDoc(gamesCollection, game);
        console.log(`Jogo adicionado: ${game.name}`);
      } else {
        console.log(`Jogo já existe: ${game.name}`);
      }
    }
    
    console.log('Inicialização de jogos concluída com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao inicializar jogos:', error);
    return false;
  }
};
