/**
 * pages/secretaria/AlunosConcluidos.jsx
 * Substitui secretaria.html + scripts/secretaria.js.
 *
 * Reaproveita o mesmo padrão de filtro por checkbox usado em
 * pages/aluno/Enviados.jsx (option-wrapper), só que aqui a lista de
 * filtros é dinâmica (cursos vindos da API) em vez de fixa (A/B/C).
 *
 * A expansão de linha (clique no aluno -> mostra documentos) que era feita
 * via toggleDocumentos() global + style.display no DOM virou estado
 * (Set de ids expandidos).
 */
import { useEffect, useMemo, useState } from 'react';
import { Api, BASE_URL_STATIC } from '../../services/api';

export default function AlunosConcluidos() {
  const [alunos, setAlunos] = useState([]);
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [filtros, setFiltros] = useState({}); // { [nomeCurso]: boolean }
  const [expandidos, setExpandidos] = useState(new Set());

  useEffect(() => {
    carregarConcluidos();
  }, []);

  async function carregarConcluidos() {
    setCarregando(true);
    try {
      const data = await Api.get('/secretaria/alunos-concluidos');
      if (data?.erro) {
        console.error(data.erro);
        return;
      }

      const listaAlunos = data.alunos || [];
      setAlunos(listaAlunos);
      setTotal(data.total ?? listaAlunos.length);

      const cursos = [...new Set(listaAlunos.map((a) => a.nomeCurso).filter(Boolean))];
      setFiltros(Object.fromEntries(cursos.map((curso) => [curso, true])));
    } catch (e) {
      console.error('Erro ao carregar:', e);
    } finally {
      setCarregando(false);
    }
  }

  const cursos = Object.keys(filtros);

  const toggleFiltro = (curso) => {
    setFiltros((prev) => ({ ...prev, [curso]: !prev[curso] }));
  };

  const alunosFiltrados = useMemo(() => {
    const selecionados = Object.entries(filtros)
      .filter(([, ativo]) => ativo)
      .map(([curso]) => curso);
    return alunos.filter((a) => selecionados.includes(a.nomeCurso));
  }, [alunos, filtros]);

  const toggleDocumentos = (alunoId) => {
    setExpandidos((prev) => {
      const next = new Set(prev);
      if (next.has(alunoId)) next.delete(alunoId);
      else next.add(alunoId);
      return next;
    });
  };

  const colgroup = (
    <colgroup>
      <col style={{ width: '25%' }} />
      <col style={{ width: '15%' }} />
      <col style={{ width: '30%' }} />
      <col style={{ width: '20%' }} />
      <col style={{ width: '10%' }} />
    </colgroup>
  );

  return (
    <div className="content cl">
      {/* Dashboard */}
      <div className="container topC rw g16">
        <p className="TopTxt">Alunos Concluídos</p>
        <p id="total-concluidos" className="TopTxt">
          {!carregando && `Total: ${total}`}
        </p>
      </div>

      {/* Filtro por curso */}
      <div className="container cl">
        <div className="topV rw g16">
          <p className="TopTxt">Filtrar por Curso</p>
        </div>
        <div className="rw p16 g16" id="filtros-curso">
          {!carregando && cursos.length === 0 && <p>Sem filtros disponíveis.</p>}
          {cursos.map((curso) => (
            <label className="option-wrapper" key={curso}>
              <input type="checkbox" checked={filtros[curso]} onChange={() => toggleFiltro(curso)} />
              <div className="custom-box">
                <div className="inner-box"></div>
              </div>
              <p>{curso}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="g16 cl">
        <table className="container topC">
          {colgroup}
          <thead>
            <tr>
              <th><p>Nome</p></th>
              <th><p>R.A.</p></th>
              <th><p>Email</p></th>
              <th><p>Curso</p></th>
              <th><p>Docs</p></th>
            </tr>
          </thead>
        </table>

        <div className="tabela-alunos">
          <table>
            {colgroup}
            <tbody id="lista-concluidos">
              {carregando ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 32 }}>
                    Carregando...
                  </td>
                </tr>
              ) : alunosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 32 }}>
                    Nenhum aluno concluído encontrado
                  </td>
                </tr>
              ) : (
                alunosFiltrados.map((aluno) => (
                  <LinhaAluno
                    key={aluno.idaluno}
                    aluno={aluno}
                    expandido={expandidos.has(aluno.idaluno)}
                    onToggle={() => toggleDocumentos(aluno.idaluno)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LinhaAluno({ aluno, expandido, onToggle }) {
  const temDocs = aluno.documentos?.length > 0;

  return (
    <>
      <tr className="aluno-row" style={{ cursor: 'pointer' }} onClick={onToggle}>
        <td>{aluno.nome}</td>
        <td>{aluno.ra}</td>
        <td>{aluno.email}</td>
        <td>{aluno.nomeCurso || '-'}</td>
        <td>
          <div className="rw">
            <span className={`icon-list ${temDocs ? 'check' : 'clock'}`}></span>
          </div>
        </td>
      </tr>
      {expandido && (
        <tr>
          <td colSpan={5}>
            <div className="cl g8 p16">
              {temDocs ? (
                aluno.documentos.map((doc, i) => (
                  <div className="rw g16 jc-sb" key={doc.id ?? i}>
                    <div className="cl g4">
                      <p>
                        <b>Documento {doc.tipo}</b> — {doc.descricao || '(sem nome)'}
                      </p>
                      <p style={{ fontSize: 12, opacity: 0.6 }}>
                        {new Date(doc.dataEmissao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    {doc.caminho_arquivo ? (
                      <button
                        className="btn-link fc"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`${BASE_URL_STATIC}/storage/${doc.caminho_arquivo}`, '_blank');
                        }}
                      >
                        <span className="icon-link"></span> Abrir
                      </button>
                    ) : (
                      <p>Sem arquivo</p>
                    )}
                  </div>
                ))
              ) : (
                <p>Nenhum documento encontrado</p>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}