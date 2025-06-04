// Mapeamento dos símbolos do Fortune Tiger para facilitar renderização por imagem
// Adapte os imports para os assets reais quando migrar as imagens

export type FortuneTigerSymbol = 'tigre' | 'dragão' | 'moeda' | 'lanterna' | 'cereja';

import tigre from '../../slots-exemplo/Fortune-tiger/img/tigre.png';
import dragão from '../../slots-exemplo/Fortune-tiger/img/dragão.png';
import moeda from '../../slots-exemplo/Fortune-tiger/img/moeda.png';
import lanterna from '../../slots-exemplo/Fortune-tiger/img/lanterna.png';
import cereja from '../../slots-exemplo/Fortune-tiger/img/cereja.png';

export const symbolImages: Record<FortuneTigerSymbol, string> = {
  tigre,
  dragão,
  moeda,
  lanterna,
  cereja,
};
