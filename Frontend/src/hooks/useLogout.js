/**
 * hooks/useLogout.js
 * Compartilhado entre pages/aluno/Perfil.jsx e components/NavSecretaria.jsx
 * (e qualquer outra tela que precise de logout).
 *
 * TODO: portar lógica real de logout.js quando ele for enviado — hoje só
 * limpa o localStorage e navega pra /login.
 */
import { useNavigate } from 'react-router-dom';
 
export function useLogout() {
  const navigate = useNavigate();
 
  return () => {
    localStorage.clear();
    navigate('/login');
  };
}
 