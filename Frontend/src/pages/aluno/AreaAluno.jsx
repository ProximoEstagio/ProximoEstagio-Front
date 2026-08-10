/**
 * pages/aluno/AreaAluno.jsx
 * Substitui area_aluno.html + scripts/uploadDoc.js + scripts/modelo.js.
 * Barra de progresso e "último documento" vêm do DocumentosContext
 * (equivalente ao que progresso.js fazia).
 */
import { useEffect, useState } from 'react';
import { Api, BASE_URL_STATIC } from '../../services/api';
import { useDocumentos } from '../../context/DocumentosContext';
import '../styles/aluno/area_aluno.css'



const DESCRICOES_PADRAO = {
  A: 'Esse termo deve conter dados do aluno, da empresa, do supervisor direto e a data de início das atividades.',
  B: 'O aluno descreve as atividades realizadas e as relaciona com o conteúdo do curso.',
  C: 'Declaração de Atividades, que formaliza o encerramento das atividades desenvolvidas durante o período.',
};

const STATUS_ICON = {
  Validado: 'check',
  Invalidado: 'off',
  Visualizado: 'eye',
  'Não Avaliado': 'clock',
};

export default function AreaAluno() {
  const { tiposEnviados, ultimos, carregando, recarregar } = useDocumentos();

  // ── Envio de documento (uploadDoc.js) ──────────────────────────────
  const [tipos, setTipos] = useState([]);
  const [arquivo, setArquivo] = useState(null);
  const [nomeDoc, setNomeDoc] = useState('');
  const [recado, setRecado] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    Api.get('/aluno/tipos')
      .then((data) => {
        if (Array.isArray(data)) setTipos(data);
      })
      .catch((e) => console.error('Erro ao carregar tipos:', e));
  }, []);

  const handleEnviar = async () => {
    const alunoId = localStorage.getItem('idaluno');

    if (!arquivo || !nomeDoc.trim() || !tipoSelecionado) {
      alert('Preencha nome, tipo e selecione um arquivo!');
      return;
    }
    if (!alunoId) {
      alert('Erro: aluno não identificado. Faça login novamente.');
      return;
    }

    const formData = new FormData();
    formData.append('arquivo', arquivo);
    formData.append('nome_documento', nomeDoc.trim());
    formData.append('recado', recado.trim());
    formData.append('tipo_documento', tipoSelecionado);
    formData.append('aluno_id', alunoId);

    setEnviando(true);
    try {
      const data = await Api.upload('/aluno/criar-documento', formData);
      if (data.status === 'sucesso') {
        alert(data.mensagem);
        setArquivo(null);
        setNomeDoc('');
        setRecado('');
        setTipoSelecionado('');
        recarregar();
      } else {
        alert(data.mensagem || 'Erro ao enviar documento.');
      }
    } catch (e) {
      console.error('Erro:', e);
      alert('Erro ao conectar com o servidor.');
    } finally {
      setEnviando(false);
    }
  };

  // ── Modelos (modelo.js) ──────────────────────────────────────────────
  const [descricoesModelo, setDescricoesModelo] = useState(DESCRICOES_PADRAO);

  useEffect(() => {
    Api.get('/professor/modelos')
      .then((data) => {
        if (!data?.success) return;
        setDescricoesModelo((prev) => ({
          A: data.modelos?.A?.descricao || prev.A,
          B: data.modelos?.B?.descricao || prev.B,
          C: data.modelos?.C?.descricao || prev.C,
        }));
      })
      .catch((e) => console.error('Erro ao carregar descrições:', e));
  }, []);

  const baixarModelo = (tipo) => {
    Api.download('/professor/modelos/baixar', { tipo }, `Modelo_${tipo}.pdf`);
  };

  // ── Último documento (progresso.js) ─────────────────────────────────
  const ultimo = ultimos[0];
  const ultimoDataFmt = ultimo ? new Date(ultimo.dataEmissao).toLocaleDateString('pt-BR') : null;
  const ultimoCaminho = ultimo?.caminho_arquivo
    ? `${BASE_URL_STATIC}/storage/${ultimo.caminho_arquivo}`
    : null;

  return (
    <div className="content cl">
      {/* Barra de Progresso */}
      <div className="container p16 cl g8">
        <p className="fs16">
          <b>Progresso de Entrega</b>
        </p>
        <div className="rw g4" id="barra-progresso">
          {['A', 'B'].map((tipo) => {
            const completo = tiposEnviados.includes(tipo);
            return (
              <div className="rw g4" key={tipo}>
                <div id={`circle-${tipo}`} className={completo ? 'circleComplete' : 'circle'}>
                  <p>{tipo}</p>
                </div>
                <div id={`prog-${tipo}`} className="progBar">
                  <div className="progProgres" style={{ width: completo ? '100%' : '0%' }}></div>
                </div>
              </div>
            );
          })}
          <div id="circle-C" className={tiposEnviados.includes('C') ? 'circleComplete' : 'circle'}>
            <p>C</p>
          </div>
        </div>
      </div>

      {/* Grid envio */}
      <div className="grid-col">
        <div className="container cl">
          <div className="topV">
            <input
              id="nomeDoc"
              placeholder="Nome do Documento"
              type="text"
              value={nomeDoc}
              onChange={(e) => setNomeDoc(e.target.value)}
            />
          </div>
          <div className="cl p16 g16 jc-sb">
            <div className="cl g16">
              <select
                id="tipoDoc"
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value)}
              >
                <option value="">Selecione o tipo de documento</option>
                {tipos.map((tipo) => (
                  <option key={tipo.idtipo} value={tipo.idtipo}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
              <div>
                <p>Recado para este Documento</p>
                <textarea id="Recado" value={recado} onChange={(e) => setRecado(e.target.value)} />
              </div>
            </div>
            <div className="rw g16">
              <p id="nomeArquivoText" className="fs14" style={{ marginBottom: 4 }}>
                {arquivo?.name || ''}
              </p>
              <button
                className="btn-F"
                type="button"
                onClick={() => document.getElementById('fileinput').click()}
              >
                Anexar
              </button>
              <input
                type="file"
                id="fileinput"
                style={{ display: 'none' }}
                onChange={(e) => setArquivo(e.target.files[0] || null)}
              />
              <button className="btn-C" type="button" onClick={handleEnviar} disabled={enviando}>
                {enviando ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>

        {/* Último documento enviado */}
        <div className="container cl" id="ultimo-doc-container">
          <div className="topC">
            <p className="TopTxt">Último Documento Enviado</p>
          </div>
          <div id="ultimo-doc-content" className="cl p16 cc g8">
            {carregando ? (
              <p>Carregando...</p>
            ) : !ultimo ? (
              <>
                <p className="fs16">
                  <b>Você ainda não enviou nenhum Documento</b>
                </p>
                <p>Eles aparecerão aqui assim que você enviar um</p>
              </>
            ) : (
              <div className="cl g8" style={{ width: '100%' }}>
                <div className="rw jc-sb">
                  <p className="fs16">
                    <b>{ultimo.descricao || '(sem nome)'}</b>
                  </p>
                  <span className={`icon-list ${STATUS_ICON[ultimo.status] || 'clock'}`}></span>
                </div>
                <p>Tipo : {ultimo.tipo}</p>
                <p>Status : {ultimo.status}</p>
                <p>Data : {ultimoDataFmt}</p>
                {ultimo.feedback && (
                  <div className="information-container">
                    <div className="rw jc-sb">
                      <p>Feedback :</p>
                      <p>{ultimo.status}</p>
                    </div>
                    <p>{ultimo.feedback}</p>
                  </div>
                )}
                {ultimoCaminho && (
                  <button className="btn-link fc" onClick={() => window.open(ultimoCaminho, '_blank')}>
                    <span className="icon-link"></span> Abrir Documento
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Faixa */}
      <div className="container topC">
        <p className="TopTxt">
          Siga as instruções para garantir que seus documentos sejam preenchidos de maneira correta
          e completa, atente-se as orientações fornecidas pelos Modelos.
        </p>
      </div>

      {/* Grid modelos */}
      <div className="grid-col">
        {['A', 'B', 'C'].map((tipo) => (
          <div className="container cl p16 g32" key={tipo}>
            <div className="cl g8">
              <p className="fs16">
                <b>Modelo do Documento {tipo}</b>
              </p>
              <p>
                <b>Instruções :</b>
              </p>
              <p id={`desc-modelo-${tipo}`}>{descricoesModelo[tipo]}</p>
            </div>
            <button className="btn-V" onClick={() => baixarModelo(tipo)}>
              Baixar Modelo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}