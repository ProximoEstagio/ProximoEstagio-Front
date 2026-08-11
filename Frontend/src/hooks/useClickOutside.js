/**
 * hooks/useClickOutside.js
 * Fecha um menu/dropdown ao clicar fora dele.
 * Substitui o padrão repetido em acessibilidade.js, script.js e dropdown.js
 * (cada um tinha sua própria lógica de "clique fora fecha").
 */
import { useEffect } from 'react';

export function useClickOutside(ref, onOutsideClick) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onOutsideClick(e);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [ref, onOutsideClick]);
}