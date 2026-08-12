/**
 * pages/professor/Admin.jsx
 * Substitui admin.html + scripts/admin.js.
 * Reaproveita components/PopupLayer.jsx pros 3 popups (novo professor,
 * novo curso, reatribuir professor). Redireciona pra /professor/alunos se
 * o usuário logado não for admin, igual à checagem original.
 */
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Api } from '../../services/api';
import PopupLayer from '../../components/PopupLayer';
import '../../styles/professor/lista.css';

export default function Admin() {
  const nivel = localStorage.getItem('nivel');
  const [tipos, setTipos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [novoTipo, setNovoTipo] = useState('');
  const [popup, setPopup] = useState(null); // 'professor' | 'curso' | { tipo: 'reatribuir', cursoId, nomeCurso }

  useEffect(() => {
    if (nivel !== 'admin') return;
    carregarTipos();
    carregarCursos();
    carregarProfessores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (nivel !== 'admin') return <Navigate to="/professor/alunos" replace />;

  async function carregarTipos() {
    const data = await Api.get('/admin/tipos');
    setTipos(data || []);
  }
  async function carregarCursos() {
    const data = await Api.get('/admin/cursos');
    setCursos(data || []);
  }
  async function carregarProfessores() {
    const data = await Api.get('/admin/professores');
    setProfessores(Array.isArray(data) ? data : []);
  }

  const criarTipo = async () => {
    const nome = novoTipo.trim();
    if (!nome) {
      alert('Digite o nome do tipo.');
      return;
    }
    const data = await Api.post('/admin/tipos', { action: 'criar', nome });
    if (data?.ok) {
      setNovoTipo('');
      carregarTipos();
    } else {
      alert(data?.erro || 'Erro ao criar tipo.');
    }
  };

  const toggleTipo = async (tipoId) => {
    const data = await Api.post('/admin/tipos', { action: 'toggleAtivo', tipo_id: tipoId });
    if (data?.ok) carregarTipos();
  };

  return (
    <div className="content cl">
      {/* Tipos de Documento */}
      <div className="container cl">
        <div className="topV rw g16">
          <span className="icon square-pencil"></span>
          <p className="TopTxt">Tipos de Documento</p>
        </div>
        <div className="cl p16 g16">
          <p>Gerencie os tipos de documento exigidos. Desativar um tipo não apaga o histórico dos alunos.</p>
          <div className="cl g8">
            {tipos.map((tipo) => (
              <div className="rw g16 jc-sb" key={tipo.idtipo}>
                <div className="rw g8" style={{ width: 'auto' }}>
                  <span className={`icon-list ${tipo.ativo ? 'check' : 'off'}`}></span>
                  <p className="fs16"><b>Tipo {tipo.nome}</b> — ordem {tipo.ordem}</p>
                </div>
                <button className="btn-link fc" onClick={() => toggleTipo(tipo.idtipo)}>
                  {tipo.ativo ? 'Desativar' : 'Ativar'}
                </button>
              </div>
            ))}
          </div>
          <div className="rw g16">
            <input
              placeholder="Nome do novo tipo (ex: D)"
              type="text"
              value={novoTipo}
              onChange={(e) => setNovoTipo(e.target.value)}
            />
            <button className="btn-V fc" onClick={criarTipo}>Adicionar Tipo</button>
          </div>
        </div>
      </div>

      {/* Cursos */}
      <div className="container cl">
        <div className="topC rw g16">
          <p className="TopTxt">Cursos</p>
        </div>
        <div className="cl p16 g16">
          <div className="cl g8">
            {cursos.length === 0 ? (
              <p>Nenhum curso cadastrado.</p>
            ) : (
              cursos.map((c) => (
                <div className="container cl" style={{ border: 'none', boxShadow: 'none' }} key={c.idcurso}>
                  <div className="rw g16 jc-sb">
                    <div className="cl g4">
                      <p className="fs16"><b>{c.nomeCurso}</b></p>
                      <p>{c.nomeProfessor ? `Professor: ${c.nomeProfessor}` : 'Sem professor vinculado'}</p>
                    </div>
                    <button
                      className="btn-link fc"
                      onClick={() => setPopup({ tipo: 'reatribuir', cursoId: c.idcurso, nomeCurso: c.nomeCurso })}
                    >
                      Reatribuir Professor
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="btn-V" onClick={() => setPopup('curso')}>Criar Novo Curso</button>
        </div>
      </div>

      {/* Professores */}
      <div className="container cl">
        <div className="topC rw g16">
          <p className="TopTxt">Professores</p>
        </div>
        <div className="cl p16 g16">
          <div className="cl g8">
            {professores.length === 0 ? (
              <p>Nenhum professor cadastrado.</p>
            ) : (
              professores.map((p) => (
                <div className="rw g16 jc-sb" key={p.idprofessor}>
                  <div className="cl g4">
                    <p className="fs16">
                      <b>{p.nome}</b>{' '}
                      <span style={{ fontSize: 12, color: p.nivel === 'admin' ? 'var(--vermelho)' : 'var(--cinza-claro)' }}>
                        [{p.nivel}]
                      </span>
                    </p>
                    <p>{p.email}</p>
                    <p>{p.nomeCurso ? `Curso: ${p.nomeCurso}` : 'Sem curso vinculado'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="btn-C" onClick={() => setPopup('professor')}>Cadastrar Novo Professor</button>
        </div>
      </div>

      <PopupNovoProfessor
        aberto={popup === 'professor'}
        cursos={cursos}
        onFechar={() => setPopup(null)}
        onSalvo={() => { carregarProfessores(); carregarCursos(); }}
      />
      <PopupNovoCurso
        aberto={popup === 'curso'}
        professores={professores.filter((p) => !p.idcurso)}
        onFechar={() => setPopup(null)}
        onSalvo={() => { carregarCursos(); carregarProfessores(); }}
      />
      <PopupReatribuir
        aberto={popup?.tipo === 'reatribuir'}
        cursoId={popup?.cursoId}
        nomeCurso={popup?.nomeCurso}
        professores={professores}
        onFechar={() => setPopup(null)}
        onSalvo={() => { carregarCursos(); carregarProfessores(); }}
      />
    </div>
  );
}

function PopupNovoProfessor({ aberto, cursos, onFechar, onSalvo }) {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', telefone: '', nivel: 'professor', cursoId: '' });

  useEffect(() => {
    if (aberto) setForm({ nome: '', email: '', senha: '', telefone: '', nivel: 'professor', cursoId: '' });
  }, [aberto]);

  const salvar = async () => {
    const { nome, email, senha, telefone, nivel, cursoId } = form;
    if (!nome || !email || !senha) {
      alert('Nome, email e senha são obrigatórios.');
      return;
    }
    const data = await Api.post('/admin/professores', {
      nome, email, senha, telefone, nivel, curso_id: cursoId || null,
    });
    if (data?.ok) {
      alert('Professor cadastrado com sucesso!');
      onFechar();
      onSalvo();
    } else {
      alert(data?.erro || 'Erro ao cadastrar.');
    }
  };

  return (
    <PopupLayer aberto={aberto} onFechar={onFechar} slim>
      <div className="topV rw jc-sb">
        <p className="TopTxt">Cadastrar Professor</p>
        <span id="close-popup" className="icon closeW" onClick={onFechar} style={{ cursor: 'pointer' }}></span>
      </div>
      <div className="cl p16 g16">
        <input placeholder="Nome" type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Senha" type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />
        <input placeholder="Telefone" type="text" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
        <select value={form.nivel} onChange={(e) => setForm({ ...form, nivel: e.target.value })}>
          <option value="professor">Professor</option>
          <option value="admin">Admin</option>
        </select>
        <select value={form.cursoId} onChange={(e) => setForm({ ...form, cursoId: e.target.value })}>
          <option value="">Sem curso vinculado</option>
          {cursos.map((c) => (
            <option key={c.idcurso} value={c.idcurso}>{c.nomeCurso}</option>
          ))}
        </select>
        <button className="btn-V" onClick={salvar}>Salvar</button>
      </div>
    </PopupLayer>
  );
}

function PopupNovoCurso({ aberto, professores, onFechar, onSalvo }) {
  const [nomeCurso, setNomeCurso] = useState('');
  const [professorId, setProfessorId] = useState('');

  useEffect(() => {
    if (aberto) { setNomeCurso(''); setProfessorId(''); }
  }, [aberto]);

  const salvar = async () => {
    if (!nomeCurso.trim()) { alert('Digite o nome do curso.'); return; }
    if (!professorId) { alert('Selecione um professor.'); return; }

    const data = await Api.post('/admin/cursos', { nomeCurso: nomeCurso.trim(), professor_id: professorId });
    if (data?.ok) {
      alert('Curso criado com sucesso!');
      onFechar();
      onSalvo();
    } else {
      alert(data?.erro || 'Erro ao criar curso.');
    }
  };

  return (
    <PopupLayer aberto={aberto} onFechar={onFechar} slim>
      <div className="topV rw jc-sb">
        <p className="TopTxt">Criar Novo Curso</p>
        <span id="close-popup" className="icon closeW" onClick={onFechar} style={{ cursor: 'pointer' }}></span>
      </div>
      <div className="cl p16 g16">
        <input placeholder="Nome do Curso" type="text" value={nomeCurso} onChange={(e) => setNomeCurso(e.target.value)} />
        <select value={professorId} onChange={(e) => setProfessorId(e.target.value)}>
          <option value="">Selecione um professor responsável</option>
          {professores.map((p) => (
            <option key={p.idprofessor} value={p.idprofessor}>{p.nome}</option>
          ))}
        </select>
        {professores.length === 0 && (
          <p style={{ color: 'var(--vermelho)', fontSize: 12 }}>Todos os professores já estão vinculados.</p>
        )}
        <button className="btn-V" onClick={salvar}>Criar Curso</button>
      </div>
    </PopupLayer>
  );
}

function PopupReatribuir({ aberto, cursoId, nomeCurso, professores, onFechar, onSalvo }) {
  const [professorId, setProfessorId] = useState('');

  useEffect(() => {
    if (aberto) setProfessorId('');
  }, [aberto]);

  const salvar = async () => {
    if (!professorId) { alert('Selecione um professor.'); return; }

    const data = await Api.post('/admin/cursos/atualizar', { curso_id: cursoId, professor_id: professorId });
    if (data?.ok) {
      alert('Professor reatribuído com sucesso!');
      onFechar();
      onSalvo();
    } else {
      alert(data?.erro || 'Erro ao reatribuir.');
    }
  };

  return (
    <PopupLayer aberto={aberto} onFechar={onFechar} slim>
      <div className="topV rw jc-sb">
        <p className="TopTxt">Reatribuir Professor — {nomeCurso}</p>
        <span id="close-popup" className="icon closeW" onClick={onFechar} style={{ cursor: 'pointer' }}></span>
      </div>
      <div className="cl p16 g16">
        <select value={professorId} onChange={(e) => setProfessorId(e.target.value)}>
          <option value="">Selecione o novo professor</option>
          {professores.map((p) => (
            <option key={p.idprofessor} value={p.idprofessor}>
              {p.nome} {p.nomeCurso ? `(em ${p.nomeCurso})` : ''}
            </option>
          ))}
        </select>
        <button className="btn-V" onClick={salvar}>Salvar</button>
      </div>
    </PopupLayer>
  );
}
