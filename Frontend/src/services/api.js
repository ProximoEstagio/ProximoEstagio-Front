/**
 * services/api.js
 * Substitui o antigo public/script/api.js + config.js.
 *
 * Prioridade pra definir a URL base:
 *   1. VITE_API_BASE_URL no seu .env (recomendado — explícito por ambiente)
 *   2. Auto-detecção local/produção, igual ao config.js original: se estiver
 *      rodando em localhost/127.0.0.1, usa a própria origem + /api; senão,
 *      cai no domínio de produção abaixo (ajuste PRODUCTION_DOMAIN).
 */
const PRODUCTION_DOMAIN = 'https://seu-dominio.com';

function detectarBaseUrl() {
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;

  const hostnamesLocais = ['localhost', '127.0.0.1', 'nextstage.local'];
  const isLocal = hostnamesLocais.includes(window.location.hostname);

  return isLocal ? `${window.location.origin}/api` : `${PRODUCTION_DOMAIN}/api`;
}

const BASE_URL = detectarBaseUrl();

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