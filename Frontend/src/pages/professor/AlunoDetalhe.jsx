/**
 * pages/professor/AlunoDetalhe.jsx
 * Substitui aluno.html + scripts/alunoDetalhe.js.
 * Antes usava ?id= na query string; como rota React, é /professor/aluno/:id
 * (veja App.jsx e o link em pages/professor/Alunos.jsx).
 */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Api, BASE_URL_STATIC } from '../../services/api';
import '../../styles/professor/aluno.css';

const STATUS_ICON = { Validado: 'check', Invalidado: 'off', Visualizado: 'eye', 'Não Avaliado': 'clock' };

export default function AlunoDetalhe() {
  const { id: alunoId } = useParams();

  const [aluno, setAluno] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [prazos, setPrazos] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!alunoId) return;
    carregarDetalhe();
    carregarPrazos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alunoId]);

  async function carregarDetalhe() {
    setCarregando(true);
    try {
      const data = await Api.post('/professor/aluno/detalhe', { aluno_id: alunoId });
      if (!data || data.erro) {
        console.error(data?.erro);
        return;
      }
      setAluno(data.aluno);
      setDocumentos(data.documentos || []);
    } catch (e) {
      console.error('Erro ao carregar aluno:', e);
    } finally {
      setCarregando(false);
    }
  }

  async function carregarPrazos() {
    try {
      const data = await Api.get('/professor/prazos', { aluno_id: alunoId });
      setPrazos(data || []);
    } catch (e) {
      console.error('Erro ao carregar prazos:', e);
    }
  }

  async function salvarPrazo(tipoId, dataLimite) {
    const data = await Api.post('/professor/prazos', { aluno_id: alunoId, tipo_id: tipoId, dataLimite });
    if (data?.ok) await carregarPrazos();
    else alert(data?.erro || 'Erro ao salvar prazo.');
  }

  async function removerPrazo(tipoId) {
    const data = await Api.post('/professor/prazos', { aluno_id: alunoId, tipo_id: tipoId, dataLimite: null });
    if (data?.ok) await carregarPrazos();
  }

  async function toggleConcluido() {
    const novoValor = !concluido;
    if (!confirm(novoValor ? 'Marcar este aluno como concluído? Ele ficará visível para a secretaria.' : 'Remover conclusão deste aluno?')) return;

    const data = await Api.post('/professor/aluno/concluir', { aluno_id: alunoId, concluido: novoValor ? 1 : 0 });
    if (data?.ok) {
      setAluno((prev) => ({ ...prev, concluido: novoValor ? 1 : 0 }));
    } else {
      alert(data?.erro || 'Erro ao atualizar.');
    }
  }

  if (!alunoId) {
    return <div className="content cl"><p style={{ padding: 32 }}>Aluno não identificado.</p></div>;
  }
  if (carregando || !aluno) {
    return <div className="content cl"><p style={{ padding: 32 }}>Carregando...</p></div>;
  }

  const concluido = aluno.concluido == 1;
  const fotoSrc = aluno.foto ? `${BASE_URL_STATIC}/storage/${aluno.foto}` : '/imagens/ft-perfil.png';

  return (
    <div className="content cl">
      {/* Perfil Aluno */}
      <div className="container rw">
        <div className="topC p32">
          <img src={fotoSrc} alt="foto do aluno" className="foto-aluno" />
        </div>
        <div className="cl p16 g8">
          <p>Informações do Aluno</p>
          <div className="rw jc-sb"><p>Nome :</p><p>{aluno.nome || '-'}</p></div>
          <div className="rw jc-sb"><p>R.A. :</p><p>{aluno.ra || '-'}</p></div>
          <div className="rw jc-sb"><p>Email :</p><p>{aluno.email || '-'}</p></div>
          <div className="rw jc-sb"><p>Curso :</p><p>{aluno.nomeCurso || '-'}</p></div>
          <div className="rw jc-sb"><p>Telefone :</p><p>{aluno.telefone || '-'}</p></div>
          <div className="rw jc-sb"><p>Semestre :</p><p>{aluno.semestre ? `${aluno.semestre}º Semestre` : '-'}</p></div>
          <button className={concluido ? 'btn-link fc' : 'btn-V fc'} onClick={toggleConcluido}>
            {concluido ? 'Remover Conclusão' : 'Marcar como Concluído'}
          </button>
        </div>
      </div>

      {/* Prazos */}
      <div className="container cl">
        <div className="topV rw g16">
          <p className="TopTxt">Prazos de Entrega</p>
        </div>
        <div className="cl p16 g16">
          {!prazos ? (
            <p>Carregando prazos...</p>
          ) : (
            prazos.map((p) => (
              <LinhaPrazo key={p.idtipo} prazo={p} onSalvar={salvarPrazo} onRemover={removerPrazo} />
            ))
          )}
        </div>
      </div>

      {/* Documentos */}
      <div className="cl g16">
        {documentos.length === 0 ? (
          <div className="container cl p16 cc"><p className="fs16"><b>Nenhum documento enviado ainda</b></p></div>
        ) : (
          documentos.map((doc) => <CardDocumento key={doc.iddocumento} doc={doc} />)
        )}
      </div>
    </div>
  );
}

function LinhaPrazo({ prazo, onSalvar, onRemover }) {
  const [valor, setValor] = useState(prazo.dataLimite || '');
  const prazoFmt = prazo.prazoFinal ? new Date(`${prazo.prazoFinal}T00:00:00`).toLocaleDateString('pt-BR') : 'Não definido';
  const vencido = prazo.prazoFinal && new Date(prazo.prazoFinal) < new Date();

  return (
    <div className="rw g16 jc-sb">
      <div className="cl g4">
        <p className="fs16"><b>Documento {prazo.tipo}</b></p>
        <p style={{ color: vencido ? 'var(--off)' : 'var(--cinza)' }}>
          Prazo: {prazoFmt} {vencido ? '⚠️ Vencido' : ''}
        </p>
        {prazo.intervalo_dias > 0 && (
          <p style={{ fontSize: 12, opacity: 0.6 }}>{prazo.intervalo_dias} dias após doc anterior</p>
        )}
      </div>
      <div className="rw g8 fc">
        <input type="date" value={valor} onChange={(e) => setValor(e.target.value)} style={{ width: 160 }} />
        <button className="btn-C fc" onClick={() => onSalvar(prazo.idtipo, valor)}>Salvar</button>
        {prazo.dataLimite && (
          <button className="btn-link fc" onClick={() => { setValor(''); onRemover(prazo.idtipo); }}>Remover</button>
        )}
      </div>
    </div>
  );
}

function CardDocumento({ doc }) {
  const dataFmt = new Date(doc.dataEmissao).toLocaleDateString('pt-BR');
  const caminho = doc.caminho_arquivo ? `${BASE_URL_STATIC}/storage/${doc.caminho_arquivo}` : null;

  return (
    <div className="container cl">
      <div className="topV rw jc-sb">
        <p className="TopTxt">{doc.descricao || '(sem nome)'}</p>
        <span className={`icon-list ${STATUS_ICON[doc.status] || 'clock'}`}></span>
      </div>
      <div className="cl p16 g16">
        <div className="cl g8">
          <p>Tipo do Documento : {doc.tipo}</p>
          <p>Status : {doc.status}</p>
          <p>Data de Criação : {dataFmt}</p>
        </div>
        {doc.feedback && (
          <div className="feedback">
            <div className="jc-sb rw"><p>Feedback :</p><p>{doc.status}</p></div>
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
