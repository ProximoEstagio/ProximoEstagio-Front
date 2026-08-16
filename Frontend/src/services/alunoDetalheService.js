/**
 * services/alunoDetalheService.js
 * Chamadas de API de pages/professor/AlunoDetalhe.jsx, isoladas do componente.
 */
import { Api } from './api';

export const AlunoDetalheService = {
  buscarDetalhe: (alunoId) => Api.post('/professor/aluno/detalhe', { aluno_id: alunoId }),

  listarPrazos: (alunoId) => Api.get('/professor/prazos', { aluno_id: alunoId }),

  salvarPrazo: (alunoId, tipoId, dataLimite) =>
    Api.post('/professor/prazos', { aluno_id: alunoId, tipo_id: tipoId, dataLimite }),

  removerPrazo: (alunoId, tipoId) =>
    Api.post('/professor/prazos', { aluno_id: alunoId, tipo_id: tipoId, dataLimite: null }),

  toggleConcluido: (alunoId, concluido) =>
    Api.post('/professor/aluno/concluir', { aluno_id: alunoId, concluido: concluido ? 1 : 0 }),
};
