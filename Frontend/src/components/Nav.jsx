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
import { useLogout } from '../hooks/useLogout';
import AcessibilidadeMenu from './AcessibilidadeMenu';
import logo from "../assets/imagens/logo.png";
import fotoPerfil from "../assets/imagens/ft-perfil.png";
import sino from "../assets/icons/sino.png";
import home from "../assets/icons/home.svg";
import moon from "../assets/icons/moon.svg";
import hamburguer from "../assets/icons/hamburguer.svg";
import logout1 from '../assets/icons/logout.svg'
import filetext from "../assets/icons/file-text.svg";
import question from "../assets/icons/question.svg";
import student from "../assets/icons/student.svg";

export default function Nav({ onAbrirInfo }) {
  const { notificacoes, abrirPrazosPopup } = useDocumentos();
  const { menuAberto, menuRef, toggleMenu, fecharMenu } = useMenuMobile();
  const { alternarTema } = useTema();
  const logout = useLogout();

  const nome = localStorage.getItem('nomeUser') || '';
  const email = localStorage.getItem('emailUser') || '';
  const foto = localStorage.getItem('foto');
  const fotoSrc = foto
    ? `${BASE_URL_STATIC}/back-end/${foto}?t=${Date.now()}`
    : `${fotoPerfil}`;

  return (
    <div className="nav cl">
      <div className="nav-content rw">
        <div className="nav-options rw">
          <img id="hamburguer" className="icon-nav hamburguer" onClick={toggleMenu} src={hamburguer} alt="" />

          <div id="nav-left" ref={menuRef} className={`nav-left rw${menuAberto ? ' visible' : ''}`}>
            <img src={logo} alt="logo" className="nav-logo" />

            <div className="nav-options rw">
              <Link to="/aluno" onClick={fecharMenu}>
                <img className="icon-nav home" src={home} alt="" />
              </Link>
              <Link to="/aluno/enviados" onClick={fecharMenu}>
                <img className="icon-nav file-text" src={filetext} alt="logo" />
              </Link>
              <a id="open-popup"
                onClick={() => {
                  onAbrirInfo();
                  fecharMenu();
                }}
                style={{ cursor: 'pointer' }}
              >
                <img className="icon-nav question" src={question} alt="" />
              </a>
              <a id="alternador" onClick={alternarTema} style={{ cursor: 'pointer' }}>
                <img className="icon-nav moon" src={moon} alt="" />
              </a>

              <AcessibilidadeMenu />

              <a
                id="sino-notificacoes"
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={abrirPrazosPopup}
              >
                <img className="icon-nav" src={sino} alt=""/>

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
                <p id="nome" className="name">{nome}Henrique Mandri</p>
                <p id="email" className="email">{email}HenriqueMandri@gmail.com</p>
              </div>
              <img id="nav-foto" src={fotoSrc} alt="foto de perfil" className="foto-perfil" />
            </div>
          </Link>
          <img className="icon student" src={student} alt="" />
          <img className="icon logout" src={logout1} onClick={logout} title="Sair" style={{cursor:"pointer",width:"25px",height:"25px"}} />
        </div>
      </div>
    </div>
  );
}