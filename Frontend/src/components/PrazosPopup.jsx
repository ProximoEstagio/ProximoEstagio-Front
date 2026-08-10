/**
 * components/PrazosPopup.jsx
 * Substitui exibirPopupPrazos() de progresso.js/sino.js.
 * Abre ao clicar no sino da Nav (via useDocumentos().abrirPrazosPopup).
 */
import { useDocumentos } from '../context/DocumentosContext';

export default function PrazosPopup() {
  const { prazos, prazosPopupAberto, fecharPrazosPopup } = useDocumentos();

  if (!prazosPopupAberto) return null;

  return (
    <div
      id="popup-layer"
      className="active"
      onClick={(e) => {
        if (e.target.id === 'popup-layer') fecharPrazosPopup();
      }}
    >
      <div className="popup slim container">
        <div className="topV rw jc-sb">
          <p className="TopTxt">Prazos de Entrega</p>
          <span className="icon closeW" onClick={fecharPrazosPopup} style={{ cursor: 'pointer' }}></span>
        </div>
        <div className="cl p16 g16">
          {prazos.map((p) => {
            const prazoFmt = p.prazoFinal
              ? new Date(p.prazoFinal + 'T00:00:00').toLocaleDateString('pt-BR')
              : 'Não definido';
            const cor = p.vencido ? 'var(--off)' : p.urgente ? 'var(--clock)' : 'var(--cinza)';
            const icon = p.jaEnviou ? 'check' : p.vencido ? 'off' : p.urgente ? 'clock' : 'empty';

            return (
              <div className="rw g8" key={p.tipo}>
                <span className={`icon-list ${icon}`}></span>
                <div className="cl g4">
                  <p className="fs16">
                    <b>Documento {p.tipo}</b>
                  </p>
                  <p style={{ color: cor }}>Prazo: {prazoFmt}</p>
                  {p.jaEnviou && (
                    <p style={{ color: 'var(--check)', fontSize: 12 }}>✓ Já enviado</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}