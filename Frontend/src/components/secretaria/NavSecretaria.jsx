/**
 * components/NavSecretaria.jsx
 * Substitui scripts/nav.js da secretaria.
 *
 * Reaproveita:
 *  - hooks/useMenuMobile.js  (hamburguer mobile — era script.js)
 *  - hooks/useTema.js        (alternador claro/escuro — era acessibilidade.js)
 *  - components/AcessibilidadeMenu.jsx (submenu de acessibilidade)
 *  - hooks/useLogout.js      (mesmo usado em pages/aluno/Perfil.jsx)
 */
import { Link } from 'react-router-dom';
import { useMenuMobile } from '../../hooks/useMenuMobile';
import { useTema } from '../../hooks/useTema';
import AcessibilidadeMenu from '../AcessibilidadeMenu';
import { useLogout } from '../../hooks/useLogout';

export default function NavSecretaria() {
  const { menuAberto, menuRef, toggleMenu, fecharMenu } = useMenuMobile();
  const { alternarTema } = useTema();
  const logout = useLogout();

  const nome = localStorage.getItem('nomeUser') || '';
  const email = localStorage.getItem('emailUser') || '';

  return (
    <div className="nav cl">
      <div className="nav-content rw">
        <div className="nav-options rw">
          <span id="hamburguer" className="icon-nav hamburguer" onClick={toggleMenu}></span>

          <div id="nav-left" ref={menuRef} className={`nav-left rw${menuAberto ? ' visible' : ''}`}>
            <img src="/imagens/logo.png" alt="logo" className="nav-logo" />

            <div className="nav-options rw">
              <Link to="/secretaria" onClick={fecharMenu}>
                <span className="icon-nav users"></span>
              </Link>
              <a id="alternador" onClick={alternarTema} style={{ cursor: 'pointer' }}>
                <span className="icon-nav moon"></span>
              </a>

              <AcessibilidadeMenu />
            </div>
          </div>
        </div>

        <div className={`rw g16 fc${menuAberto ? ' invisible' : ''}`}>
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