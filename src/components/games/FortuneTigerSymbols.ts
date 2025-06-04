// Mapeamento dos símbolos do Fortune Tiger para facilitar renderização por imagem
// Adapte os imports para os assets reais quando migrar as imagens

export type FortuneTigerSymbol = 'tigre' | 'dragão' | 'moeda' | 'lanterna' | 'cereja';

export const symbolImages: Record<FortuneTigerSymbol, string> = {
  tigre: '/slots-exemplo/Fortune-tiger/img/tigre.png',
  dragão: '/slots-exemplo/Fortune-tiger/img/dragão.png',
  moeda: '/slots-exemplo/Fortune-tiger/img/moeda.png',
  lanterna: '/slots-exemplo/Fortune-tiger/img/lanterna.png',
  cereja: '/slots-exemplo/Fortune-tiger/img/cereja.png',
};
