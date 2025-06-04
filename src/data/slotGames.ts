import { Game } from '../contexts/GameContext';

// Jogos de slots inspirados na linha Fortune Tiger da PG Soft
export const slotGames: Omit<Game, 'id'>[] = [
  {
    name: 'Fortune Tiger',
    description: 'Entre na selva e encontre o tigre da fortuna para ganhar grandes prêmios!',
    minBet: 5,
    maxBet: 30,
    imageUrl: 'https://i.ibb.co/VjNVTLB/fortune-tiger.jpg',
    type: 'slots',
    popularity: 95
  },
  {
    name: 'Fortune Ox',
    description: 'Celebre o ano novo lunar com o boi da fortuna e multiplique seus minutos!',
    minBet: 5,
    maxBet: 25,
    imageUrl: 'https://i.ibb.co/qkQHPZM/fortune-ox.jpg',
    type: 'slots',
    popularity: 90
  },
  {
    name: 'Fortune Dragon',
    description: 'Desperte o dragão da fortuna e receba recompensas lendárias!',
    minBet: 10,
    maxBet: 40,
    imageUrl: 'https://i.ibb.co/5xC2Lkz/fortune-dragon.jpg',
    type: 'slots',
    popularity: 92
  },
  {
    name: 'Fortune Mouse',
    description: 'Siga o ratinho da sorte em busca de queijos dourados e prêmios incríveis!',
    minBet: 3,
    maxBet: 20,
    imageUrl: 'https://i.ibb.co/NZ9YWSV/fortune-mouse.jpg',
    type: 'slots',
    popularity: 85
  },
  {
    name: 'Fortune Rabbit',
    description: 'Pule com o coelho da fortuna e colete cenouras douradas para ganhar mais minutos!',
    minBet: 5,
    maxBet: 25,
    imageUrl: 'https://i.ibb.co/Jk7YWLB/fortune-rabbit.jpg',
    type: 'slots',
    popularity: 88
  },
  {
    name: 'Lucky Neko',
    description: 'O gato da sorte está pronto para trazer fortuna e multiplicadores incríveis!',
    minBet: 8,
    maxBet: 35,
    imageUrl: 'https://i.ibb.co/Lk7YWLB/lucky-neko.jpg',
    type: 'slots',
    popularity: 91
  },
  {
    name: 'Phoenix Rises',
    description: 'Renasça das cinzas com a fênix e conquiste prêmios ardentes!',
    minBet: 10,
    maxBet: 45,
    imageUrl: 'https://i.ibb.co/Lk7YWLB/phoenix-rises.jpg',
    type: 'slots',
    popularity: 89
  },
  {
    name: 'Golden Lotus',
    description: 'Descubra os segredos da flor de lótus dourada e encontre tesouros orientais!',
    minBet: 7,
    maxBet: 30,
    imageUrl: 'https://i.ibb.co/Lk7YWLB/golden-lotus.jpg',
    type: 'slots',
    popularity: 87
  }
];

// Função para adicionar jogos ao Firestore (pode ser usada em um script de inicialização)
export const getSlotGames = () => {
  return slotGames;
};
