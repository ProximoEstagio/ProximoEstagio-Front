/**
 * services/perfilService.js
 * Chamadas de API do endpoint /perfil e /upload-foto.
 * Compartilhado entre pages/professor/Perfil.jsx e pages/aluno/Perfil.jsx —
 * mesmo endpoint, mesmo formato de payload nos dois.
 */
import { Api } from './api';

export const PerfilService = {
  carregar: (emailUser, tipoUser) =>
    Api.post('/perfil', { reason: 'loadPage', emailUser, tipoUser }),

  atualizar: (dados) => Api.post('/perfil', { reason: 'update', ...dados }),

  uploadFoto: (formData) => Api.upload('/upload-foto', formData),
};
