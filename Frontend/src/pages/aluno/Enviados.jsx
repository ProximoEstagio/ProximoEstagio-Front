/**
 * pages/aluno/Enviados.jsx
 * Substitui enviados.html + scripts/enviados.js.
 * Dados (ultimos/historico) vêm do DocumentosContext, já que é o mesmo
 * endpoint /aluno/documentos usado na Área do Aluno.
 */
import { useMemo, useState } from 'react';
import { useDocumentos } from '../../context/DocumentosContext';
import { BASE_URL_STATIC } from '../../services/api';
import '../../styles/aluno/enviados.css'

const STATUS_ICON = {
  Validado: 'check',
  Invalidado: 'off',
  Visualizado: 'eye',
  'Não Avaliado': 'clock',
};

function CardDocumento({ doc, destaque }) {
  const dataFmt = new Date(doc.dataEmissao).toLocaleDateString('pt-BR');
  const caminho = doc.caminho_arquivo ? `${BASE_URL_STATIC}/storage/${doc.caminho_arquivo}` : null;

  return (
    <div className={`container cl ${destaque ? 'doc-destaque' : ''}`}>
      <div className="topV rw jc-sb g16">
        <p className="TopTxt">{doc.descricao || '(sem nome)'}</p>
        <span className={`icon-list ${STATUS_ICON[doc.status] || 'clock'}`}></span>
      </div>
      <div className="cl p16 g16">
        <div className="cl g8">
          <p>Tipo do Documento : {doc.tipo}</p>
          <p>Status : {doc.status}</p>
          <p>Data de Envio : {dataFmt}</p>
        </div>
        {doc.feedback && (
          <div className="information-container">
            <div className="jc-sb rw">
              <p>Feedback :</p>
              <p>{doc.status}</p>
            </div>
            <p>{doc.feedback}</p>
          </div>
        )}
        {caminho && (
          <button className="btn-link fc" onClick={() => window.open(caminho, '_blank')}>
            <span className="icon-link"></span> Abrir Documento
          </button>
        )}
      </div>
    </div>
  );
}

export default function Enviados() {
  const { ultimos, historico, carregando } = useDocumentos();
  const [filtros, setFiltros] = useState({ A: true, B: true, C: true });

  const toggleFiltro = (tipo) => {
    setFiltros((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  const selecionados = useMemo(
    () => Object.entries(filtros).filter(([, ativo]) => ativo).map(([tipo]) => tipo),
    [filtros]
  );

  const ultimosFiltrados = ultimos.filter((d) => selecionados.includes(d.tipo));
  const historicoFiltrado = historico.filter((d) => selecionados.includes(d.tipo));

  return (
    <div className="content slim cl">
      <div className="container topC">
        <p className="TopTxt">Documentos Enviados</p>
      </div>

      {/* Filtro */}
      <div className="container cl">
        <div className="topV rw g16">
          <p className="TopTxt">Filtrar por Tipo</p>
        </div>
        <div className="rw p16 g16">
          {['A', 'B', 'C'].map((tipo) => (
            <label className="option-wrapper" key={tipo}>
              <input type="checkbox" checked={filtros[tipo]} onChange={() => toggleFiltro(tipo)} />
              <div className="custom-box">
                <div className="inner-box"></div>
              </div>
              <p>Tipo {tipo}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Últimos enviados */}
      <div className="container topC">
        <p className="TopTxt">Últimos Enviados</p>
      </div>
      <div id="ultimos-container" className="cl g16">
        {carregando ? (
          <p style={{ padding: 16 }}>Carregando...</p>
        ) : ultimosFiltrados.length === 0 ? (
          <div className="container cl p16 cc">
            <p className="fs16">
              <b>Você ainda não enviou nenhum documento</b>
            </p>
          </div>
        ) : (
          ultimosFiltrados.map((doc) => (
            <CardDocumento key={doc.id ?? `${doc.tipo}-${doc.dataEmissao}`} doc={doc} destaque />
          ))
        )}
      </div>

      {/* Histórico */}
      {historicoFiltrado.length > 0 && (
        <>
          <div className="container topC" id="historico-header">
            <p className="TopTxt">Histórico</p>
          </div>
          <div id="historico-container" className="cl g16">
            {historicoFiltrado.map((doc) => (
              <CardDocumento key={doc.id ?? `${doc.tipo}-${doc.dataEmissao}`} doc={doc} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}