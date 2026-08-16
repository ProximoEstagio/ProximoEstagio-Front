/**
 * pages/professor/Documentos.jsx
 * Substitui documentos.html + scripts/documentos.js + scripts/popupDocumento.js.
 * Chamadas de API centralizadas em services/professorDocumentosService.js.
 * Reaproveita components/PopupLayer.jsx e o padrão de filtro por checkbox
 * (option-wrapper/custom-box) já usado em pages/aluno/Enviados.jsx e
 * pages/secretaria/AlunosConcluidos.jsx.
 */
import { useEffect, useMemo, useState } from 'react';
import { BASE_URL_STATIC } from '../../services/api';
import { ProfessorDocumentosService } from '../../services/professorDocumentosService';
import PopupLayer from '../../components/alunos/PopupLayer';
import '../../styles/professor/lista.css';
import '../../styles/professor/documentos.css';

const STATUS_ICON = { Validado: 'check', Invalidado: 'off', Visualizado: 'eye', 'Não Avaliado': 'clock' };
const STATUS_OPCOES = [
  { id: 'VA', label: 'Validado', valor: 'Validado' },
  { id: 'IN', label: 'Invalidado', valor: 'Invalidado' },
  { id: 'VI', label: 'Visualizado', valor: 'Visualizado' },
  { id: 'NA', label: 'Não Avaliado', valor: 'Não Avaliado' },
];
const TIPO_OPCOES = ['A', 'B', 'C'];
const DASHBOARD_IDS = {
  Validado: 'progCheck',
  Invalidado: 'progOff',
  Visualizado: 'progEye',
  'Não Avaliado': 'progClock',
};

export default function Documentos() {
  const [documentos, setDocumentos] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [statusSel, setStatusSel] = useState([]);
  const [tipoSel, setTipoSel] = useState([]);
  const [docSelecionado, setDocSelecionado] = useState(null);

  const professorId = localStorage.getItem('idprofessor');

  useEffect(() => {
    carregarDocumentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function carregarDocumentos() {
    setCarregando(true);
    try {
      const data = await ProfessorDocumentosService.listar(
        professorId,
        localStorage.getItem('nivel') || 'professor'
      );
      if (!data || data.erro) {
        console.error(data?.erro);
        return;
      }
      setDocumentos(data.documentos || []);
      setDashboard(data.dashboard || {});
      setTotal(data.total || 0);
    } catch (e) {
      console.error('Erro ao carregar documentos:', e);
    } finally {
      setCarregando(false);
    }
  }

  const toggleStatus = (valor) => {
    setStatusSel((prev) => (prev.includes(valor) ? prev.filter((v) => v !== valor) : [...prev, valor]));
  };
  const toggleTipo = (valor) => {
    setTipoSel((prev) => (prev.includes(valor) ? prev.filter((v) => v !== valor) : [...prev, valor]));
  };

  const documentosFiltrados = useMemo(() => {
    return documentos.filter((doc) => {
      const passaStatus = !statusSel.length || statusSel.includes(doc.status);
      const passaTipo = !tipoSel.length || tipoSel.includes(doc.tipo);
      return passaStatus && passaTipo;
    });
  }, [documentos, statusSel, tipoSel]);

  const abrirDocumento = async (doc) => {
    setDocSelecionado(doc);
    // Igual ao original: abrir um doc "Não Avaliado" já marca como "Visualizado"
    if (doc.status === 'Não Avaliado') {
      await atualizarStatus(doc, 'Visualizado', '');
    }
  };

  async function atualizarStatus(doc, status, feedback) {
    await ProfessorDocumentosService.atualizarStatus({
      professorId,
      documentoId: doc.iddocumento,
      tipoId: doc.tipo_idtipo,
      status,
      feedback,
    });
  }

  const avaliarDocumento = async (status, feedback) => {
    await atualizarStatus(docSelecionado, status, feedback);
    setDocSelecionado(null);
    await carregarDocumentos();
  };

  return (
    <div className="content cl">
      <div className="grid-col">
        {/* Filtros */}
        <div className="container cl">
          <div className="topV rw g16">
            <span className="icon filter"></span>
            <p className="TopTxt">Filtrar Documentos</p>
          </div>
          <div className="rw p16">
            <div className="cl g8">
              <p className="fs18">Status :</p>
              {STATUS_OPCOES.map((opt) => (
                <label className="option-wrapper" key={opt.id}>
                  <input
                    type="checkbox"
                    checked={statusSel.includes(opt.valor)}
                    onChange={() => toggleStatus(opt.valor)}
                  />
                  <div className="custom-box">
                    <div className="inner-box"></div>
                  </div>
                  <p>{opt.label}</p>
                </label>
              ))}
            </div>
            <div className="cl g8">
              <p className="fs18">Tipo :</p>
              {TIPO_OPCOES.map((tipo) => (
                <label className="option-wrapper" key={tipo}>
                  <input type="checkbox" checked={tipoSel.includes(tipo)} onChange={() => toggleTipo(tipo)} />
                  <div className="custom-box">
                    <div className="inner-box"></div>
                  </div>
                  <p>{tipo}</p>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="container cl">
          <div className="cl p8 g16 jc-sb">
            {Object.entries(DASHBOARD_IDS).map(([status, classe]) => {
              const quant = dashboard[status] || 0;
              const largura = total ? (quant / total) * 100 : 0;
              return (
                <div className="option-group rw g8" key={status}>
                  <span className={`icon-list ${STATUS_ICON[status]}`}></span>
                  <div className="mid cl">
                    <p>{status}</p>
                    <div className="progBar rw">
                      <div className={classe} style={{ width: `${largura}%` }}></div>
                    </div>
                  </div>
                  <div className="quant">
                    <p>{quant}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="g16 cl">
        <table className="container topC">
          <ColgroupDocumentos />
          <thead>
            <tr>
              <th><p>Nome do Documento</p></th>
              <th><p>Tipo</p></th>
              <th><p>Nome do Aluno</p></th>
              <th><p>R.A. do Aluno</p></th>
              <th><p>Status</p></th>
              <th></th>
            </tr>
          </thead>
        </table>

        <div className="tabela-alunos">
          <table>
            <ColgroupDocumentos />
            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 32 }}>Carregando documentos...</td>
                </tr>
              ) : documentosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 32 }}>Nenhum documento encontrado</td>
                </tr>
              ) : (
                documentosFiltrados.map((doc) => (
                  <tr className="doc-row" key={doc.iddocumento} style={{ cursor: 'pointer' }} onClick={() => abrirDocumento(doc)}>
                    <td>{doc.descricao || '(sem nome)'}</td>
                    <td>{doc.tipo}</td>
                    <td>{doc.nome_aluno}</td>
                    <td>{doc.ra}</td>
                    <td><div className="rw"><span className={`icon-list ${STATUS_ICON[doc.status] || 'clock'}`}></span></div></td>
                    <td><div className="rw"><span className="icon-link"></span></div></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PopupAvaliacao doc={docSelecionado} onFechar={() => setDocSelecionado(null)} onAvaliar={avaliarDocumento} />
    </div>
  );
}

function ColgroupDocumentos() {
  return (
    <colgroup>
      <col className="col-1" />
      <col className="col-2" />
      <col className="col-3" />
      <col className="col-4" />
      <col className="col-5" />
      <col className="col-6" />
    </colgroup>
  );
}

function PopupAvaliacao({ doc, onFechar, onAvaliar }) {
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setFeedback('');
  }, [doc]);

  const aberto = !!doc;
  const caminho = doc?.caminho_arquivo ? `${BASE_URL_STATIC}/storage/${doc.caminho_arquivo}` : null;

  return (
    <PopupLayer aberto={aberto} onFechar={onFechar}>
      {doc && (
        <>
          <div className="topV rw jc-sb">
            <p className="TopTxt">{doc.descricao || '(sem nome)'}</p>
            <p className="TopTxt">Tipo do Documento : {doc.tipo}</p>
            <div className="rw fc g8">
              <p className="TopTxt">Status : </p>
              <span className={`icon-list ${STATUS_ICON[doc.status] || 'clock'}`}></span>
            </div>
            <span id="close-popup" className="icon closeW" onClick={onFechar} style={{ cursor: 'pointer' }}></span>
          </div>

          <div className="cl g16 p16">
            <div className="cl g8">
              <p>Aluno</p>
              <div className="information-container">
                <div className="rw g8">
                  <p>Nome :</p>
                  <p className="fs16">{doc.nome_aluno}</p>
                </div>
                <div className="rw g8">
                  <p>R.A. :</p>
                  <p className="fs16">{doc.ra}</p>
                </div>
                <div className="rw g8">
                  <p>Data de envio :</p>
                  <p className="fs16">{new Date(doc.dataEmissao).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>

            <div className="cl g8">
              <p>Recado do Aluno</p>
              <div className="information-container">
                <p>{doc.descricao || '(sem recado)'}</p>
              </div>
            </div>

            {caminho && (
              <button className="btn-link" onClick={() => window.open(caminho, '_blank')}>
                <span className="icon-link"></span>
                <p>Abrir Documento</p>
              </button>
            )}

            <div className="g8 cl">
              <p>Adicione um feedback para o aluno</p>
              <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            </div>

            <div className="rw g16">
              <button className="btn-invalidar" onClick={() => onAvaliar('Invalidado', feedback)}>
                <p>Invalidar</p>
              </button>
              <button className="btn-validar" onClick={() => onAvaliar('Validado', feedback)}>
                <p>Validar</p>
              </button>
            </div>
          </div>
        </>
      )}
    </PopupLayer>
  );
}