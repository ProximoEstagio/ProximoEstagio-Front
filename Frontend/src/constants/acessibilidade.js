/**
 * constants/acessibilidade.js
 * Lista de modos de acessibilidade — compartilhada entre todas as Navs
 * (aluno, secretaria, professor...). Extraído daqui pra não duplicar
 * entre componentes de Nav diferentes.
 */
export const MODOS_ACESSIBILIDADE = [
  { valor: 'normal', label: 'Normal' },
  { valor: 'deuteranopia', label: 'Deuteranopia' },
  { valor: 'protanopia', label: 'Protanopia' },
  { valor: 'tritanopia', label: 'Tritanopia' },
  { valor: 'alto-contraste', label: 'Alto Contraste' },
];