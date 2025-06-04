import { initializeGames } from '../utils/initializeGames';

// Este script pode ser executado separadamente para garantir que os jogos
// estejam inicializados no Firestore, mesmo sem precisar carregar toda a aplicação
console.log('Inicializando jogos de slots no Firestore...');

initializeGames()
  .then(() => {
    console.log('Jogos inicializados com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao inicializar jogos:', error);
  });
