/**
 * pages/Login.jsx
 * Substitui index.html + public/script/index.js.
 *
 * Ajustado para consumir API Spring Boot em vez de Laravel:
 *  - Trata tanto erro "200 + { erro: '...' }" (padrão antigo) quanto erro
 *    HTTP real (401/403 com corpo { message: '...' }), que é o mais comum
 *    em controllers Spring (ex: BadCredentialsException).
 *  - Continua usando services/api.js — só troque VITE_API_BASE_URL no .env
 *    para apontar pro backend Spring Boot (ex: http://localhost:8080/api).
 *
 * TODO: o backend original devolvia um campo `page` (ex: "aluno/area_aluno.html")
 * usado para redirecionar via window.location. Como agora é uma SPA, mapeei
 * isso pra rotas do react-router em MAPA_PAGINAS — complete conforme migrar
 * as telas de professor/secretaria.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../services/api';

const MAPA_PAGINAS = {
  'aluno/area_aluno.jsx': '/aluno',
  'professor/alunos.jsx': '/alunos',
  'secretaria/secretaria.jsx':'/secretaria',
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const fazerLogin = async () => {
    if (!email.trim() || !senha) {
      setErro('Preencha email e senha.');
      return;
    }

    setErro('');
    setEnviando(true);
    try {
      const data = await Api.post('/login', { email: email.trim(), senha });

      // Compatibilidade com backend antigo: 200 OK mas com campo `erro`
      if (!data?.token) {
        setErro(data?.erro || data?.message || 'Usuário ou senha inválidos');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('tipoUsuario', data.tipoUsuario ?? '');
      localStorage.setItem('nomeUser', data.nome ?? '');
      localStorage.setItem('emailUser', email.trim());
      localStorage.setItem('idcurso', data.idcurso ?? '');
      localStorage.setItem('idprofessor', data.idprofessor ?? '');
      localStorage.setItem('idaluno', data.idaluno ?? '');
      localStorage.setItem('idsecretaria', data.idsecretaria ?? '');
      localStorage.setItem('nivel', data.nivel ?? '');

      const rota = MAPA_PAGINAS[data.page];
      if (rota) {
        navigate(rota);
      } else {
        // Página ainda não migrada para React — fallback pro caminho antigo
        window.location.assign(`/${data.page}`);
      }
    } catch (e) {
      // Spring Boot normalmente retorna status HTTP de erro (401/403) com
      // corpo { message: '...' } em vez de 200 + { erro: '...' } — services/api.js
      // já transforma isso num Error com essa mensagem.
      console.error('Erro na requisição:', e);
      setErro(e.message || 'Erro ao conectar com o servidor.');
    } finally {
      setEnviando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fazerLogin();
  };

  return (
    <div className="content cl cc">
      <div className="container cl p32 g32 w45c" onKeyDown={handleKeyDown}>
        <p className="fs28">Faça seu Login</p>
        <div className="cl g16">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        {erro && (
          <p className="fs14" style={{ color: 'var(--vermelho)' }}>
            {erro}
          </p>
        )}
        <div className="rw jc-sb">
          <a href="#recuperar_senha">Esqueci minha senha</a>
          <button className="btn-V w28c" onClick={fazerLogin} disabled={enviando}>
            {enviando ? 'Entrando...' : 'Logar'}
          </button>
        </div>
      </div>
    </div>
  );
}