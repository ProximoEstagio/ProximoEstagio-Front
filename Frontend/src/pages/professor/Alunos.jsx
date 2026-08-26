/**
 * pages/professor/Alunos.jsx
 * Substitui alunos.html + scripts/listaAlunos.js + scripts/popupCadastro.js +
 * scripts/uploadPlanilha.js.
 * Reaproveita components/PopupLayer.jsx pro cadastro manual.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Api } from '../../services/api';
import PopupLayer from '../../components/alunos/PopupLayer';
import '../../styles/professor/lista.css';
import '../../styles/professor/alunos.css';
import userplus from '../../assets/icons/user-plus.svg'
import filter from '../../assets/icons/filter.svg'

const POR_PAGINA = 5;
const STATUS_ICON = { Validado: 'check', Invalidado: 'off', Visualizado: 'eye', 'Não Avaliado': 'clock', empty: 'empty' };

export default function Alunos() {
  const nivel = localStorage.getItem('nivel') || 'professor';
  const professorId = localStorage.getItem('idprofessor') || '';

  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [cursos, setCursos] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroEmail, setFiltroEmail] = useState('');
  const [filtroSemestre, setFiltroSemestre] = useState('');
  const [pagina, setPagina] = useState(1);
  const [popupAberto, setPopupAberto] = useState(false);
  const [preview, setPreview] = useState(null); // lista de alunos do CSV, ou null
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (nivel === 'admin') {
      Api.get('/admin/cursos').then((data) => setCursos(data || []));
    }
    carregarAlunos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function carregarAlunos(cursoId = cursoSelecionado) {
    setCarregando(true);
    try {
      const data = await Api.get('/professor/alunos', {
        nivel,
        professor_id: professorId,
        curso_id: cursoId || undefined,
      });
      if (!data || data.erro) {
        console.error(data?.erro);
        return;
      }
      console.log("Resposta da API:", response.data);
      console.log("É array?", Array.isArray(response.data));
      setAlunos(data);
      setPagina(1);
    } catch (e) {
      console.error('Erro ao carregar alunos:', e);
    } finally {
      setCarregando(false);
    }
  }

  const alunosFiltrados = useMemo(() => {
    const nome = filtroNome.toLowerCase().trim();
    const email = filtroEmail.toLowerCase().trim();
    const semestre = filtroSemestre.trim();
    return alunos.filter(
      (a) =>
        (!nome || a.nome.toLowerCase().includes(nome)) &&
        (!email || a.email.toLowerCase().includes(email)) &&
        (!semestre || String(a.semestre) === semestre)
    );
  }, [alunos, filtroNome, filtroEmail, filtroSemestre]);

  const totalPaginas = Math.max(1, Math.ceil(alunosFiltrados.length / POR_PAGINA));
  const alunosPagina = alunosFiltrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  return (
    <div className="content cl">
      <div className="grid-col">
        {/* Adicionar Alunos */}
        <div className="container cl">
          <div className="topV rw g16">
            <img className="icon user-plus" src={userplus} alt="" />
            <p className="TopTxt">Adicionar Alunos</p>
          </div>
          <div className="cl p16 g16">
            <p>Suba um arquivo CSV com os dados dos alunos para criar as contas automaticamente.</p>
            <div>
              <p>Colunas obrigatórias no CSV :</p>
              <p>- nome</p>
              <p>- ra</p>
              <p>- email</p>
              <p>- semestre</p>
            </div>
            <div className="rw jc-sb g16">
              <button className="btn-V" onClick={() => fileInputRef.current?.click()}>
                Subir Planilha CSV
              </button>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleArquivoCsv(e, setPreview)}
              />
              <button className="btn-C" onClick={() => setPopupAberto(true)}>
                Cadastrar Manualmente
              </button>
            </div>
          </div>
        </div>

        {/* Filtro */}
        <div className="container cl">
          <div className="topV rw g16">
            <img className="icon filter-C" src={filter} alt="" />
            <p className="TopTxt">Filtro de Alunos</p>
          </div>
          <div className="cl p16 g16 jc-sb">
            {nivel === 'admin' && (
              <select
                value={cursoSelecionado}
                onChange={(e) => {
                  setCursoSelecionado(e.target.value);
                  carregarAlunos(e.target.value);
                }}
              >
                <option value="">Todos os cursos</option>
                {cursos.map((c) => (
                  <option key={c.idcurso} value={c.idcurso}>{c.nomeCurso}</option>
                ))}
              </select>
            )}
            <div className="filter-inputs">
              <input placeholder="Nome" type="text" value={filtroNome} onChange={(e) => { setFiltroNome(e.target.value); setPagina(1); }} />
              <input placeholder="email" type="email" value={filtroEmail} onChange={(e) => { setFiltroEmail(e.target.value); setPagina(1); }} />
              <input
                placeholder="Semestre"
                type="number"
                min="1"
                max="6"
                step="1"
                value={filtroSemestre}
                onChange={(e) => { setFiltroSemestre(e.target.value); setPagina(1); }}
              />
            </div>
          </div>
        </div>
      </div>

      {preview && (
        <PreviewCsv
          alunos={preview}
          professorId={professorId}
          onCancelar={() => {
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
          onConfirmado={() => {
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            carregarAlunos();
          }}
        />
      )}

      {/* Lista de Alunos */}
      <div className="g16 cl">
        <table className="container">
          <ColgroupAlunos />
          <thead>
            <tr>
              <th><p>Nome</p></th>
              <th><p>R.A</p></th>
              <th>
                <div className="rw jc-sa">
                  <p>A</p><p>B</p><p>C</p>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
        </table>

        <div className="tabela-alunos">
          <table>
            <ColgroupAlunos />
            <tbody>
              {carregando ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: 32 }}>Carregando alunos...</td></tr>
              ) : alunosPagina.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: 32 }}>Nenhum aluno encontrado</td></tr>
              ) : (
                alunosPagina.map((aluno) => <LinhaAluno key={aluno.idaluno} aluno={aluno} />)
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button key={i} className={pagina === i + 1 ? 'active' : ''} onClick={() => setPagina(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <PopupCadastro
        aberto={popupAberto}
        nivel={nivel}
        professorId={professorId}
        cursos={cursos}
        onFechar={() => setPopupAberto(false)}
        onCadastrado={carregarAlunos}
      />
    </div>
  );
}

function ColgroupAlunos() {
  return (
    <colgroup>
      <col className="col-1" /><col className="col-2" /><col className="col-3" /><col className="col-4" />
    </colgroup>
  );
}

function LinhaAluno({ aluno }) {
  const statusKeys = Object.keys(aluno).filter((k) => k.startsWith('status_'));
  return (
    <tr>
      <td>{aluno.nome}</td>
      <td>{aluno.ra}</td>
      <td>
        <div className="rw jc-sa">
          {statusKeys.map((k) => {
            const tipo = k.replace('status_', '');
            return (
              <span
                key={k}
                className={`icon-list ${STATUS_ICON[aluno[k]] || 'empty'}`}
                title={`Documento ${tipo}: ${aluno[k]}`}
              ></span>
            );
          })}
        </div>
      </td>
      <td>
        <div className="container-icon">
          <Link to={`/professor/aluno/${aluno.idaluno}`} target="_blank">
            <span className="link-empty"></span>
          </Link>
        </div>
      </td>
    </tr>
  );
}

function PopupCadastro({ aberto, nivel, professorId, cursos, onFechar, onCadastrado }) {
  const [form, setForm] = useState({ nome: '', ra: '', email: '', semestre: '', cursoId: '' });

  useEffect(() => {
    if (aberto) setForm({ nome: '', ra: '', email: '', semestre: '', cursoId: '' });
  }, [aberto]);

  const cadastrar = async () => {
    const { nome, ra, email, semestre, cursoId } = form;
    if (!nome || !ra || !email || !semestre) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (!/^\d{13}$/.test(ra)) {
      alert('O RA deve conter exatamente 13 números.');
      return;
    }
    if (nivel === 'admin' && !cursoId) {
      alert('Selecione o curso do aluno.');
      return;
    }

    const body = { nome, ra, email, semestre, professor_id: professorId };
    if (cursoId) body.curso_id = cursoId;

    try {
      const data = await Api.post('/professor/aluno/criar', body);
      if (data?.message) {
        alert('Aluno cadastrado com sucesso!');
        onFechar();
        onCadastrado();
      } else {
        alert('Erro ao cadastrar: ' + (data?.error || 'Erro desconhecido'));
      }
    } catch (e) {
      console.error('Erro ao cadastrar aluno:', e);
      alert('Erro ao cadastrar aluno.');
    }
  };

  return (
    <PopupLayer aberto={aberto} onFechar={onFechar} slim>
      <div className="topV rw jc-sb">
        <div className="rw g16">
          <span className="icon user-plus"></span>
          <p className="TopTxt">Cadastrar Aluno Manualmente</p>
        </div>
        <span id="close-popup" className="icon closeW" onClick={onFechar} style={{ cursor: 'pointer' }}></span>
      </div>
      <div className="cl p16 g16 jc-sb">
        <div className="filter-inputs">
          <input placeholder="Nome" type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          <input
            placeholder="R.A. (13 dígitos)"
            type="number"
            value={form.ra}
            onChange={(e) => setForm({ ...form, ra: e.target.value })}
          />
          <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input
            placeholder="Semestre"
            type="number"
            min="1"
            max="6"
            value={form.semestre}
            onChange={(e) => setForm({ ...form, semestre: e.target.value })}
          />
          {nivel === 'admin' && (
            <select value={form.cursoId} onChange={(e) => setForm({ ...form, cursoId: e.target.value })}>
              <option value="">Selecione o curso</option>
              {cursos.map((c) => (
                <option key={c.idcurso} value={c.idcurso}>{c.nomeCurso}</option>
              ))}
            </select>
          )}
        </div>
        <button className="btn-V" onClick={cadastrar}>Cadastrar</button>
      </div>
    </PopupLayer>
  );
}

// ── CSV ──────────────────────────────────────────────────────────────────────

function handleArquivoCsv(e, setPreview) {
  const arquivo = e.target.files[0];
  if (!arquivo) return;

  if (arquivo.name.split('.').pop().toLowerCase() !== 'csv') {
    alert('Apenas arquivos .csv são aceitos.');
    e.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const alunos = parseCSV(event.target.result);
    if (!alunos.length) {
      alert('Nenhum aluno válido encontrado no arquivo.');
      return;
    }
    setPreview(alunos);
  };
  reader.readAsText(arquivo, 'UTF-8');
}

function parseCSV(texto) {
  const linhas = texto.trim().split('\n');
  if (linhas.length < 2) return [];
  const sep = linhas[0].includes(';') ? ';' : ',';
  const cabecalho = linhas[0].split(sep).map((c) => c.trim().toLowerCase());

  const colMap = {
    nome: ['nome', 'name'],
    ra: ['ra', 'r.a.', 'ra.', 'registro acadêmico'],
    email: ['email', 'e-mail'],
    semestre: ['semestre', 'sem'],
  };
  const indices = {};
  for (const [campo, variantes] of Object.entries(colMap)) {
    indices[campo] = cabecalho.findIndex((c) => variantes.includes(c));
  }

  const alunos = [];
  for (let i = 1; i < linhas.length; i++) {
    const cols = linhas[i].split(sep).map((c) => c.trim().replace(/^"|"$/g, ''));
    if (cols.every((c) => !c)) continue;
    alunos.push({
      nome: indices.nome >= 0 ? cols[indices.nome] : '',
      ra: indices.ra >= 0 ? cols[indices.ra].replace(/\D/g, '').slice(0, 13) : '',
      email: indices.email >= 0 ? cols[indices.email] : '',
      semestre: indices.semestre >= 0 ? cols[indices.semestre] : '',
    });
  }
  return alunos;
}

function PreviewCsv({ alunos, professorId, onCancelar, onConfirmado }) {
  const [enviando, setEnviando] = useState(false);

  const confirmar = async () => {
    setEnviando(true);
    try {
      const data = await Api.post('/professor/alunos/csv', { alunos, professor_id: professorId });

      let msg = `✅ ${data.total_ok} aluno(s) cadastrado(s) com sucesso!`;
      if (data.total_falho > 0) {
        msg += `\n\n⚠️ ${data.total_falho} não cadastrado(s):\n`;
        data.falhos.forEach((f) => {
          msg += `- ${f.aluno.nome || f.aluno.ra}: ${f.motivo}\n`;
        });
      }
      alert(msg);
      onConfirmado();
    } catch (e) {
      console.error('Erro ao cadastrar alunos via CSV:', e);
      alert('Erro ao cadastrar alunos.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container cl" style={{ marginTop: 16 }}>
      <div className="topV rw jc-sb">
        <p className="TopTxt">Preview — {alunos.length} aluno(s)</p>
      </div>
      <div className="cl p16 g16">
        <div className="tabela-alunos">
          <table>
            <thead>
              <tr style={{ background: 'var(--cinza-paleta)' }}>
                <th><p>Nome</p></th>
                <th><p>R.A.</p></th>
                <th><p>Email</p></th>
                <th><p>Semestre</p></th>
                <th><p>Status</p></th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((a, i) => {
                const raValido = /^\d{13}$/.test(a.ra);
                const valido = a.nome && a.ra && a.email && a.semestre && raValido;
                return (
                  <tr key={i}>
                    <td>{a.nome || <span style={{ color: 'red' }}>vazio</span>}</td>
                    <td>{raValido ? a.ra : <span style={{ color: 'red' }}>{a.ra || 'vazio'} (13 dígitos)</span>}</td>
                    <td>{a.email || <span style={{ color: 'red' }}>vazio</span>}</td>
                    <td>{a.semestre || <span style={{ color: 'red' }}>vazio</span>}</td>
                    <td>{valido ? <span style={{ color: 'green' }}>✓ válido</span> : <span style={{ color: 'red' }}>✗ inválido</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="rw g16">
          <button className="btn-link fc" onClick={onCancelar} disabled={enviando}>Cancelar</button>
          <button className="btn-V" onClick={confirmar} disabled={enviando}>
            {enviando ? 'Cadastrando...' : 'Confirmar Cadastro'}
          </button>
        </div>
      </div>
    </div>
  );
}
