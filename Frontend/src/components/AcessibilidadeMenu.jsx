/**
 * components/AcessibilidadeMenu.jsx
 * Substitui a parte de abrir/fechar + destacar opção ativa de acessibilidade.js.
 * Reaproveitado por Nav.jsx (aluno) e NavSecretaria.jsx.
 */
import { useRef, useState } from 'react';
import { MODOS_ACESSIBILIDADE } from '../constants/acessibilidade';
import { useAcessibilidade } from '../hooks/useAcessibilidade';
import { useClickOutside } from '../hooks/useClickOutside';

export default function AcessibilidadeMenu() {
  const { modo, definirModo } = useAcessibilidade();
  const [aberto, setAberto] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setAberto(false));

  const escolher = (novoModo) => {
    definirModo(novoModo);
    setAberto(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <span
        id="btn-acessibilidade"
        className="icon-nav acessibilidade"
        title="Acessibilidade"
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          setAberto((v) => !v);
        }}
      ></span>
      <div id="menu-acessibilidade" className={`menu-acess${aberto ? ' visible' : ''}`}>
        {MODOS_ACESSIBILIDADE.map((m) => (
          <button
            key={m.valor}
            data-modo={m.valor}
            className={m.valor === modo ? 'ativo' : ''}
            onClick={() => escolher(m.valor)}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}