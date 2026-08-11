/**
 * hooks/useTema.js
 * Substitui a parte de dark mode de acessibilidade.js.
 * Aplica o atributo `tema` no <html>, exatamente como o original fazia
 * com document.documentElement.setAttribute('tema', tema).
 */
import { useEffect, useState } from 'react';

export function useTema() {
  const [tema, setTema] = useState(() => localStorage.getItem('tema') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('tema', tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((atual) => {
      const novo = atual === 'dark' ? 'light' : 'dark';
      localStorage.setItem('tema', novo);
      return novo;
    });
  };

  return { tema, alternarTema };
}