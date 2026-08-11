/**
 * hooks/useLogout.js
 * Compartilhado entre pages/aluno/Perfil.jsx e components/NavSecretaria.jsx.
 * Substitui logout.js: chama a API pra invalidar o token no backend antes
 * de limpar o localStorage — mas limpa e redireciona mesmo se a chamada falhar.
 */
import { useNavigate } from 'react-router-dom';
import { Api } from '../services/api';

export function useLogout() {
  const navigate = useNavigate();

  return async () => {
    const token = localStorage.getItem('token');
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    const email = localStorage.getItem('emailUser');

    try {
      await Api.post('/logout', { token, tipoUsuario, email });
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
    } finally {
      localStorage.clear();
      navigate('/login');
    }
  };
}