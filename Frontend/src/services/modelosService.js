/**
 * services/modelosService.js
 * Chamadas de API dos modelos de documento (A/B/C).
 * Compartilhado entre pages/professor/Modelos.jsx (lista + upload) e
 * pages/aluno/AreaAluno.jsx (lista + download) — mesmos endpoints,
 * então fica num service só em vez de duplicar as strings de rota.
 */
import { Api } from './api';

export const ModelosService = {
  listar: () => Api.get('/professor/modelos'),

  baixar: (tipo) => Api.download('/professor/modelos/baixar', { tipo }, `Modelo_${tipo}.pdf`),

  upload: (formData) => Api.upload('/professor/modelos/upload', formData),
};
