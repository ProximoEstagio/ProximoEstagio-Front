/**
 * services/adminService.js
 * Chamadas de API de pages/professor/Admin.jsx, isoladas do componente.
 */
import { Api } from './api';

export const AdminService = {
  listarTipos: () => Api.get('/admin/tipos'),
  criarTipo: (nome) => Api.post('/admin/tipos', { action: 'criar', nome }),
  toggleTipo: (tipoId) => Api.post('/admin/tipos', { action: 'toggleAtivo', tipo_id: tipoId }),

  listarCursos: () => Api.get('/admin/cursos'),
  criarCurso: (nomeCurso, professorId) =>
    Api.post('/admin/cursos', { nomeCurso, professor_id: professorId }),
  reatribuirCurso: (cursoId, professorId) =>
    Api.post('/admin/cursos/atualizar', { curso_id: cursoId, professor_id: professorId }),

  listarProfessores: () => Api.get('/admin/professores'),
  criarProfessor: (body) => Api.post('/admin/professores', body),
};
