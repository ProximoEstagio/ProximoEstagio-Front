/**
 * services/api.js
 * Substitui o antigo public/script/api.js + config.js.
 *
 * Define VITE_API_BASE_URL no seu .env, ex:
 *   VITE_API_BASE_URL=http://localhost:8000/api
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// URL base "sem /api", usada para montar links de storage/back-end (fotos, docs)
export const BASE_URL_STATIC = BASE_URL.replace(/\/api\/?$/, '');

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

async function request(path, { method = 'GET', body, headers = {}, isFormData = false } = {}) {
  const token = localStorage.getItem('token');

  const config = {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (body !== undefined) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, config);

  if (!response.ok) {
    const erro = await parseResponse(response).catch(() => null);
    throw new Error(erro?.message || erro?.mensagem || `Erro na requisição (${response.status})`);
  }

  return parseResponse(response);
}

export const Api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  upload: (path, formData) => request(path, { method: 'POST', body: formData, isFormData: true }),

  /**
   * Baixa um arquivo (equivalente ao Api.download original).
   */
  async download(path, params, filename) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}${path}${query}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!response.ok) throw new Error(`Erro ao baixar arquivo (${response.status})`);

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};