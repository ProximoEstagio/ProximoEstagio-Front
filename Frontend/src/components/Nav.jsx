/**
 * components/Nav.jsx
 * Substitui scripts/nav.js — antes injetava HTML via innerHTML, agora é componente.
 *
 * Ajuste os imports de imagens/ícones para o caminho real dos seus assets.
 *
 * TODO (lógica ainda não portada, arquivos originais não enviados):
 *  - #hamburguer (menu mobile) -> provavelmente em script.js
 *  - #alternador (tema claro/escuro) -> script.js
 *  - modo de acessibilidade (aplicar classe no <body>) -> acessibilidade.js
 */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDocumentos } from '../context/DocumentosContext';
import { BASE_URL_STATIC } from '../services/api';

const MODOS_ACESSIBILIDADE = [
  { valor: 'normal', label: 'Normal' },
  { valor: 'deuteranopia', label: 'Deuteranopia' },
  { valor: 'protanopia', label: 'Protanopia' },
  { valor: 'tritanopia', label: 'Tritanopia' },
  { valor: 'alto-contraste', label: 'Alto Contraste' },
];

export default function Nav({ onAbrirInfo }) {
  const { notificacoes, abrirPrazosPopup } = useDocumentos();
  const [menuAcessAberto, setMenuAcessAberto] = useState(false);

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
          <span id="hamburguer" className="icon-nav hamburguer"></span>

          <div id="nav-left" className="nav-left rw">
            <img src="/imagens/logo.png" alt="logo" className="nav-logo" />

            <div className="nav-options rw">
              <Link to="/aluno">
                <span className="icon-nav home"></span>
              </Link>
              <Link to="/aluno/enviados">
                <span className="icon-nav file-text"></span>
              </Link>
              <a onClick={onAbrirInfo} style={{ cursor: 'pointer' }}>
                <span className="icon-nav question"></span>
              </a>
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

        <div className="rw g16 fc">
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