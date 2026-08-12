/**
 * components/InfoEstagioPopup.jsx
 * Substitui a parte estática de scripts/popup.js ("O QUE É ESTÁGIO?").
 */
import close from "../assets/icons/close.svg";

const DOCUMENTOS = [
  { letra: 'A', texto: 'O documento A é um termo de aceite. Esse é o primeiro documento a ser entregue' },
  { letra: 'B', texto: 'o documento B é um documento relatando suas atividades no estágio. Esse é o segundo a ser entregue' },
  { letra: 'C', texto: 'O documento C é um atestado de conclusão de estágio. Esse é o ultimo a ser entregue' },
];

export default function InfoEstagioPopup({ aberto, onFechar }) {
  if (!aberto) return null;

  return (
    <div
      id="popup-layer"
      className="active"
      onClick={(e) => {
        if (e.target.id === 'popup-layer') onFechar();
      }}
    >
      <div className="popup container">
        <div className="cl al-fe p8">
          <img className="icon close" onClick={onFechar} style={{ cursor: 'pointer' }} src={close} alt="" />
        </div>

        <div className="cl cc" style={{ paddingBottom: 48 }}>
          <div className="w80c cl">
            <p className="fs36" style={{ fontWeight: 1000, color: 'var(--vermelho)' }}>
              O QUE É ESTÁGIO?
            </p>
            <p className="fs16">
              Estágio é uma atividade realizada por estudantes que ainda estão cursando o ensino
              médio, técnico ou superior, com o objetivo de aprender na prática o que estudam na
              teoria. Ele serve como uma preparação para o mercado de trabalho, permitindo que o
              aluno desenvolva habilidades profissionais, ganhe experiência e entenda melhor como
              funciona a sua futura profissão.
            </p>
          </div>
        </div>

        <div className="topC cl cc">
          <div className="g16 w80c cl">
            <div className="topV cc cl" style={{ borderRadius: 5, marginTop: -50 }}>
              <p className="TopTxt" style={{ fontSize: 22 }}>
                DOCUMENTOS NECESSÁRIOS PARA VALIDAR ESTÁGIO
              </p>
            </div>

            <div className="container p16 cl g16">
              <div className="grid-150 jc-sb">
                {DOCUMENTOS.map(({ letra, texto }) => (
                  <div className="cl g8" key={letra}>
                    <div className="rw al-fe cc">
                      <span className="icon file"></span>
                      <p className="fs28" style={{ fontWeight: 600, marginLeft: -12 }}>
                        {letra}
                      </p>
                    </div>
                    <p>{texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}