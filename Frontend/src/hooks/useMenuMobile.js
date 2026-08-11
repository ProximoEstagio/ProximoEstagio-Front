/**
 * hooks/useMenuMobile.js
 * Substitui script.js (toggle do menu hamburguer mobile).
 * Original: clique no hamburguer alterna 'visible' no menu e 'invisible'
 * no perfil; clique num link do menu ou fora dele fecha tudo de volta.
 */
import { useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';

export function useMenuMobile() {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setMenuAberto(false));

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuAberto((v) => !v);
  };

  const fecharMenu = () => setMenuAberto(false);

  return { menuAberto, menuRef, toggleMenu, fecharMenu };
}