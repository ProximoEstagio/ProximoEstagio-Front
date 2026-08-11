/**
 * components/NavSecretaria.jsx
 * Substitui scripts/nav.js da secretaria — mesma estrutura da Nav do aluno,
 * mas sem sino/link de perfil/foto (a secretaria não tem essas telas) e com
 * botão de logout visível direto na barra (ícone, sem texto).
 *
 * Reaproveita:
 *  - MODOS_ACESSIBILIDADE de constants/acessibilidade.js
 *  - useLogout() de hooks/useLogout.js (mesmo usado em pages/aluno/Perfil.jsx)
 */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MODOS_ACESSIBILIDADE } from '../constants/acessibilidade';
import { useLogout } from '../hooks/useLogout';

export default function NavSecretaria() {
  const [menuAcessAberto, setMenuAcessAberto] = useState(false);
  const logout = useLogout();

  const nome = localStorage.getItem('nomeUser') || '';
  const email = localStorage.getItem('emailUser') || '';

  return (
    <div className="nav cl">
      <div className="nav-content rw">
        <div className="nav-options rw">
          <span id="hamburguer" className="icon-nav hamburguer"></span>

          <div id="nav-left" className="nav-left rw">
            <img src="/imagens/logo.png" alt="logo" className="nav-logo" />

            <div className="nav-options rw">
              <Link to="/secretaria">
                <span className="icon-nav users"></span>
              </Link>
              <a id="alternador" style={{ cursor: 'pointer' }}>
                <span className="icon-nav moon"></span>
              </a>

              <div style={{ position: 'relative' }}>
                <span
                  id="btn-acessibilidade"
                  className="icon-nav acessibilidade"
                  title="Acessibilidade"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setMenuAcessAberto((v) => !v)}
                ></span>
                {menuAcessAberto && (
                  <div className="menu-acess">
                    {MODOS_ACESSIBILIDADE.map((modo) => (
                      <button key={modo.valor} data-modo={modo.valor}>
                        {modo.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rw g16 fc">
          <div className="nav-perfil rw">
            <div id="perfil-info" className="cl">
              <p id="nome" className="name">{nome}</p>
              <p id="email" className="email">{email}</p>
            </div>
          </div>
          <button id="logout" className="btn-V fc" style={{ height: 36 }} onClick={logout}>
            <span className="icon logout"></span>
          </button>
        </div>
      </div>
    </div>
  );
}