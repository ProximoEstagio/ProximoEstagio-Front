/**
 * components/NotificacoesPopup.jsx
 * Substitui exibirPopupNotificacoes() de progresso.js/sino.js.
 * Abre automaticamente 1x por sessão quando há prazos vencidos/urgentes
 * (lógica de disparo fica no DocumentosContext).
 */
import { useDocumentos } from '../context/DocumentosContext';

export default function NotificacoesPopup() {
  const { notificacoes, notifPopupAberto, fecharNotifPopup } = useDocumentos();

  if (!notifPopupAberto) return null;

  return (
    <div
      id="popup-layer"
      className="active"
      onClick={(e) => {
        if (e.target.id === 'popup-layer') fecharNotifPopup();
      }}
    >
      <div className="popup slim container">
        <div className="topV rw jc-sb">
          <p className="TopTxt">⚠️ Atenção aos Prazos!</p>
          <span className="icon closeW" onClick={fecharNotifPopup} style={{ cursor: 'pointer' }}></span>
        </div>
        <div className="cl p16 g16">
          {notificacoes.map((n) => (
            <div className="rw g8" key={n.tipo}>
              <span className={`icon-list ${n.vencido ? 'off' : 'clock'}`}></span>
              <div className="cl g4">
                <p className="fs16">
                  <b>Documento {n.tipo}</b>
                </p>
                <p style={{ color: n.vencido ? 'var(--off)' : 'var(--clock)' }}>
                  {n.vencido ? 'Prazo vencido em ' : 'Vence em '}
                  {new Date(n.prazoFinal + 'T00:00:00').toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          ))}
          <button className="btn-C" onClick={fecharNotifPopup}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}