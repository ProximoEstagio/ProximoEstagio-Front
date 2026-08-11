/**
 * hooks/useAcessibilidade.js
 * Substitui a parte de modo de acessibilidade (deuteranopia, alto-contraste
 * etc.) de acessibilidade.js. Aplica o atributo `acessibilidade` no <html>,
 * igual ao original.
 */
import { useEffect, useState } from 'react';

export function useAcessibilidade() {
  const [modo, setModo] = useState(() => localStorage.getItem('modoAcessibilidade') || 'normal');

  useEffect(() => {
    document.documentElement.setAttribute('acessibilidade', modo);
  }, [modo]);

  const definirModo = (novoModo) => {
    localStorage.setItem('modoAcessibilidade', novoModo);
    setModo(novoModo);
  };

  return { modo, definirModo };
}