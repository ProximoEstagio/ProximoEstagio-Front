/**
 * components/ProtectedRoute.jsx
 * Substitui requireLogin.js.
 *
 * No original, esse script era incluído (sem defer) ANTES dos outros scripts
 * em cada página protegida, bloqueando o acesso antes de qualquer render.
 * Em React isso vira um componente de rota: envolva as rotas protegidas com
 * ele no lugar de <AlunoLayout>/<SecretariaLayout> diretamente (veja README).
 */
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Api } from '../services/api';

export default function ProtectedRoute() {
  const [status, setStatus] = useState('verificando'); // 'verificando' | 'valido' | 'invalido'

  useEffect(() => {
    verificar();
  }, []);

  async function verificar() {
    const token = localStorage.getItem('token');
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!token || !tipoUsuario) {
      setStatus('invalido');
      return;
    }

    try {
      const data = await Api.post('/verificar-token', { token, tipoUsuario });
      if (!data?.valido) {
        localStorage.clear();
        setStatus('invalido');
      } else {
        setStatus('valido');
      }
    } catch (e) {
      console.error('Erro ao verificar token:', e);
      setStatus('invalido');
    }
  }

  if (status === 'verificando') return null; // TODO: trocar por um spinner/loader se preferir
  if (status === 'invalido') return <Navigate to="/login" replace />;
  return <Outlet />;
}