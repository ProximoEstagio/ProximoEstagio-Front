/**
 * components/Nav.jsx
 * Substitui scripts/nav.js — antes injetava HTML via innerHTML, agora é componente.
 *
 * Integra:
 *  - hooks/useMenuMobile.js  -> hamburguer mobile (era script.js)
 *  - hooks/useTema.js        -> alternador claro/escuro (era parte de acessibilidade.js)
 *  - components/AcessibilidadeMenu.jsx -> submenu de acessibilidade (era parte de acessibilidade.js)
 */
import { Link } from 'react-router-dom';
import { useDocumentos } from '../context/DocumentosContext';
import { BASE_URL_STATIC } from '../services/api';
import { useMenuMobile } from '../hooks/useMenuMobile';
import { useTema } from '../hooks/useTema';
import AcessibilidadeMenu from './AcessibilidadeMenu';

export default function Nav({ onAbrirInfo }) {
  const { notificacoes, abrirPrazosPopup } = useDocumentos();
  const { menuAberto, menuRef, toggleMenu, fecharMenu } = useMenuMobile();
  const { alternarTema } = useTema();

  const nome = localStorage.getItem('nomeUser') || '';
  const email = localStorage.getItem('emailUser') || '';
  const foto = localStorage.getItem('foto');
  const fotoSrc = foto
    ? `${BASE_URL_STATIC}/back-end/${foto}?t=${Date.now()}`
    : '/imagens/ft-perfil.png';

  return (
    <div className="nav cl">
      <div className="nav-content rw">
        <div className="nav-options rw">
          <span id="hamburguer" className="icon-nav hamburguer" onClick={toggleMenu}></span>

          <div id="nav-left" ref={menuRef} className={`nav-left rw${menuAberto ? ' visible' : ''}`}>
            <img src="/imagens/logo.png" alt="logo" className="nav-logo" />

            <div className="nav-options rw">
              <Link to="/aluno" onClick={fecharMenu}>
                <span className="icon-nav home"></span>
              </Link>
              <Link to="/aluno/enviados" onClick={fecharMenu}>
                <span className="icon-nav file-text"></span>
              </Link>
              <a
                onClick={() => {
                  onAbrirInfo();
                  fecharMenu();
                }}
                style={{ cursor: 'pointer' }}
              >
                <span className="icon-nav question"></span>
              </a>
              <a id="alternador" onClick={alternarTema} style={{ cursor: 'pointer' }}>
                <span className="icon-nav moon"></span>
              </a>

              <AcessibilidadeMenu />

              <a
                id="sino-notificacoes"
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={abrirPrazosPopup}
              >
                <span
                  className="icon-nav"
                  style={{ backgroundImage: "url('/icons/sino.png')" }}
                ></span>
                {notificacoes.length > 0 && (
                  <span
                    id="sino-badge"
                    style={{
                      display: 'flex',
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      background: 'var(--vermelho)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 16,
                      height: 16,
                      fontSize: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {notificacoes.length}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>

        <div className={`rw g16 fc${menuAberto ? ' invisible' : ''}`}>
          <Link id="perfil" to="/aluno/perfil">
            <div className="nav-perfil rw">
              <div id="perfil-info" className="cl">
                <p id="nome" className="name">{nome}</p>
                <p id="email" className="email">{email}</p>
              </div>
              <img id="nav-foto" src={fotoSrc} alt="foto de perfil" className="foto-perfil" />
            </div>
          </Link>
          <span className="icon student"></span>
        </div>
      </div>
    </div>
  );
}