/**
 * components/PopupLayer.jsx
 * Wrapper genérico pro padrão de popup usado no projeto inteiro
 * (#popup-layer.active > .popup[.slim].container), visto em
 * InfoEstagioPopup.jsx, PrazosPopup.jsx e nos vários popups do professor
 * (popupCadastro.js, popupDocumento.js, popupModelo.js, admin.js).
 * Fecha ao clicar fora (no fundo) ou pelo botão de fechar interno.
 */

import '../../styles/global.css'
export default function PopupLayer({ aberto, onFechar, slim = false, children }) {
  if (!aberto) return null;

  return (
    <div
      id="popup-layer"
      className="popup-layer"
      onClick={(e) => {
        if (e.target.id === 'popup-layer') onFechar();
      }}
    >
      <div className={`popup container${slim ? ' slim' : ''}`}>{children}</div>
    </div>
  );
}
