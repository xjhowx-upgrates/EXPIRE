import { initializeGames } from '../utils/initializeGames';

// Função principal de teste
async function testInitializeGames() {
  console.log('Iniciando teste de inicialização dos jogos...');
  
  try {
    const result = await initializeGames();
    
    if (result) {
      console.log('✅ Teste concluído com sucesso!');
    } else {
      console.error('❌ Falha no teste de inicialização');
    }
  } catch (error) {
    console.error('❌ Erro durante o teste:', error);
  }
}

// Executa o teste
testInitializeGames();
