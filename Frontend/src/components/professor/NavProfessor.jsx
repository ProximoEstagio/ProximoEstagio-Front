/**
 * components/NavProfessor.jsx
 * Substitui pages/professor/scripts/nav.js.
 *
 * Reaproveita:
 *  - hooks/useMenuMobile.js  (hamburguer mobile — era script.js)
 *  - hooks/useTema.js        (alternador claro/escuro — era acessibilidade.js)
 *  - components/AcessibilidadeMenu.jsx (submenu de acessibilidade)
 *  - hooks/useLogout.js      (mesmo usado em NavSecretaria / aluno/Perfil.jsx)
 *
 * O link "Admin" só aparece se localStorage.nivel === 'admin', igual à
 * checagem que o nav.js original fazia antes de montar o innerHTML.
 */
import { Link } from 'react-router-dom';
import { useMenuMobile } from '../../hooks/useMenuMobile';
import { useTema } from '../../hooks/useTema';
import { useLogout } from '../../hooks/useLogout';
import { BASE_URL_STATIC } from '../../services/api';
import AcessibilidadeMenu from '../AcessibilidadeMenu';
import logo from '../../assets/imagens/logo.png';
import users from '../../assets/icons/users.svg';
import filetext from '../../assets/icons/file-text.svg';
import fotoPadrao from '../../assets/imagens/ft-perfil.png';
import squarepencil from '../../assets/icons/square-pencil.svg';
import adminicon from '../../assets/icons/banco.svg';
import moon from '../../assets/icons/moon.svg'
import logout1 from '../../assets/icons/logout.svg'
import teacher from '../../assets/icons/teacher.svg'

export default function NavProfessor() {
  const { menuAberto, menuRef, toggleMenu, fecharMenu } = useMenuMobile();
  const { alternarTema } = useTema();
  const logout = useLogout();

  const nome = localStorage.getItem('nomeUser') || '';
  const email = localStorage.getItem('emailUser') || '';
  const nivel = localStorage.getItem('nivel');
  const foto = localStorage.getItem('foto');
  const fotoSrc = foto ? `${BASE_URL_STATIC}/back-end/${foto}?t=${Date.now()}` : fotoPadrao;

  return (
    <div className="nav cl">
      <div className="nav-content rw">
        <div className="nav-options rw">
          <span id="hamburguer" className="icon-nav hamburguer" onClick={toggleMenu}></span>

          <div id="nav-left" ref={menuRef} className={`nav-left rw${menuAberto ? ' visible' : ''}`}>
            <img src={logo} alt="logo" className="nav-logo" />

            <div className="nav-options rw">
              <Link to="/professor/alunos" onClick={fecharMenu}>
                <img className="icon-nav users" src={users} alt="" />
              </Link>
              <Link to="/professor/documentos" onClick={fecharMenu}>
                <img className="icon-nav file-text" src={filetext} alt="" />
              </Link>
              <Link to="/professor/modelos" onClick={fecharMenu}>
                <img className="icon-nav square-pencil" src={squarepencil} alt="" />
              </Link>
              {nivel === 'admin' && (
                <Link to="/professor/admin" onClick={fecharMenu} title="Painel Admin">
                  <img className="icon-nav admin-icon" src={adminicon} alt="" />
                </Link>
              )}
              <a id="alternador" onClick={alternarTema} style={{ cursor: 'pointer' }}>
                <img className="icon-nav moon" src={moon} alt="" />
              </a>

              <AcessibilidadeMenu />
            </div>
          </div>
        </div>

        <div className={`rw g16 fc${menuAberto ? ' invisible' : ''}`}>
          <Link id="perfil" to="/professor/perfil" onClick={fecharMenu}>
            <div className="nav-perfil rw">
              <div id="perfil-info" className="cl">
                <p id="nome" className="name">{nome}Henrique Mandri</p>
                <p id="email" className="email">{email}HenriqueMandri@gmail.com</p>
              </div>
              <img id="nav-foto" src={fotoSrc} alt="foto de perfil" className="foto-perfil" />
            </div>
          </Link>
          <img className="icon teacher" src={teacher} alt="" />
          <img className="icon logout" src={logout1} onClick={logout} title="Sair" style={{cursor:"pointer",width:"25px",height:"25px"}} />
          
        </div>
      </div>
    </div>
  );
}
