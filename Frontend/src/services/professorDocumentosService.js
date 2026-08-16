/**
 * services/professorDocumentosService.js
 * Chamadas de API de pages/professor/Documentos.jsx, isoladas do componente.
 */
import { Api } from './api';

export const ProfessorDocumentosService = {
  listar: (professorId, nivel) =>
    Api.post('/professor/documentos', { professor_id: professorId, nivel }),

  atualizarStatus: ({ professorId, documentoId, tipoId, status, feedback }) =>
    Api.post('/professor/status', {
      professor_id: professorId,
      documento_id: documentoId,
      tipo_id: tipoId,
      status,
      feedback,
    }),
};
