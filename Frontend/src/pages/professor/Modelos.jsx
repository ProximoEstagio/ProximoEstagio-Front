/**
 * pages/professor/Modelos.jsx
 * Substitui modelos.html + scripts/modelo.js + scripts/popupModelo.js.
 * Reaproveita components/PopupLayer.jsx pro popup de upload.
 */
import { useEffect, useState } from 'react';
import { Api, BASE_URL_STATIC } from '../../services/api';
import PopupLayer from '../../components/alunos/PopupLayer';
import '../../styles/professor/modelos.css';

const DESCRICOES_PADRAO = {
  A: 'Esse termo deve conter dados do aluno, da empresa, do supervisor direto e a data de início das atividades. Ele deve ser assinado por um profissional que ocupe um cargo hierarquicamente superior ao do aluno.',
  B: 'O aluno descreve as atividades realizadas e as relaciona com o conteúdo do curso. Esse relatório é assinado apenas pelo aluno.',
  C: 'Declaração de Atividades, que formaliza o encerramento das atividades desenvolvidas durante o período.',
};

export default function Modelos() {
  const [modelos, setModelos] = useState({});
  const [tipoAberto, setTipoAberto] = useState(null); // 'A' | 'B' | 'C' | null

  useEffect(() => {
    carregarModelos();
  }, []);

  async function carregarModelos() {
    try {
      const data = await Api.get('/professor/modelos');
      if (data?.success) setModelos(data.modelos || {});
    } catch (e) {
      console.error('Erro ao carregar modelos:', e);
    }
  }

  return (
    <div className="content cl">
      <div className="container topC">
        <p className="TopTxt">
          Elabore os modelos dos documentos necessários para a sua disciplina de estágio e
          disponibilize-os aqui para que os alunos possam acessá-los
        </p>
      </div>

      <div className="grid-col">
        {['A', 'B', 'C'].map((tipo) => (
          <CardModelo
            key={tipo}
            tipo={tipo}
            modelo={modelos[tipo]}
            onNovoModelo={() => setTipoAberto(tipo)}
          />
        ))}
      </div>

      <PopupModelo
        tipo={tipoAberto}
        aberto={!!tipoAberto}
        onFechar={() => setTipoAberto(null)}
        onSalvo={carregarModelos}
      />
    </div>
  );
}

function CardModelo({ tipo, modelo, onNovoModelo }) {
  return (
    <div className="container cl p16 g32">
      <div className="cl g8">
        <p className="fs16">
          <b>Modelo do Documento {tipo}</b>
        </p>
        <div className="rw jc-sb">
          {modelo?.caminho && (
            <a
              href={`${BASE_URL_STATIC}/storage/${modelo.caminho}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--cinza)', textDecoration: 'underline' }}
            >
              Visualizar modelo atual
            </a>
          )}
        </div>
        <p>
          <b>Instruções :</b>
        </p>
        <p>{modelo?.descricao || DESCRICOES_PADRAO[tipo]}</p>
      </div>
      <button data-open-popup="modelo" className="btn-V" onClick={onNovoModelo}>
        Novo Modelo
      </button>
    </div>
  );
}

function PopupModelo({ tipo, aberto, onFechar, onSalvo }) {
  const [instrucoes, setInstrucoes] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (aberto) {
      setInstrucoes('');
      setArquivo(null);
    }
  }, [aberto]);

  const salvar = async () => {
    if (!arquivo || !tipo) {
      alert('Selecione um arquivo e defina o tipo antes de salvar.');
      return;
    }

    const formData = new FormData();
    formData.append('instrucoes', instrucoes.trim());
    formData.append('tipoDocumento', tipo);
    formData.append('arquivo', arquivo);
    formData.append('professor_id', localStorage.getItem('idprofessor') || '1');

    setEnviando(true);
    try {
      const data = await Api.upload('/professor/modelos/upload', formData);
      if (data?.success) {
        alert(`Modelo do tipo ${tipo} salvo com sucesso!`);
        onFechar();
        onSalvo();
      } else {
        alert('Erro ao salvar: ' + (data?.message || 'Erro desconhecido.'));
      }
    } catch (e) {
      console.error('Erro ao salvar modelo:', e);
      alert('Erro ao salvar modelo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <PopupLayer aberto={aberto} onFechar={onFechar} slim>
      <div className="topV rw jc-sb">
        <p className="TopTxt">Criar novo Modelo de Documento</p>
        <span id="close-popup" className="icon closeW" onClick={onFechar} style={{ cursor: 'pointer' }}></span>
      </div>
      <div className="cl g16 p16">
        <div className="cl g8">
          <p>
            Instruções para os alunos <span style={{ opacity: 0.6, fontSize: 12 }}>(opcional)</span>
          </p>
          <textarea value={instrucoes} onChange={(e) => setInstrucoes(e.target.value)} />
        </div>
        <p style={{ fontWeight: 'bold', color: '#444' }}>
          {tipo ? `Tipo selecionado: ${tipo}` : 'Tipo não definido'}
        </p>
        <p style={{ fontSize: 14, color: '#555' }}>{arquivo ? `${arquivo.name} anexado` : ''}</p>
        <button className="btn-F" onClick={() => document.getElementById('fileinput-modelo').click()}>
          Selecionar Documento de Modelo
        </button>
        <input
          type="file"
          id="fileinput-modelo"
          style={{ display: 'none' }}
          onChange={(e) => setArquivo(e.target.files[0] || null)}
        />
        <button className="btn-V" onClick={salvar} disabled={enviando}>
          {enviando ? 'Salvando...' : 'Salvar Modelo'}
        </button>
      </div>
    </PopupLayer>
  );
}
