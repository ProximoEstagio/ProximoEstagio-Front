/**
 * layouts/SecretariaLayout.jsx
 * Equivalente ao AlunoLayout, mas mais simples: a secretaria não usa
 * DocumentosContext (sino/prazos são só do aluno) nem popups.
 *
 * Exemplo de uso (App.jsx):
 *
 *   <Route element={<SecretariaLayout />}>
 *     <Route path="/secretaria" element={<AlunosConcluidos />} />
 *   </Route>
 */
import { Outlet } from 'react-router-dom';
import NavSecretaria from '../components/NavSecretaria';

export default function SecretariaLayout() {
  return (
    <>
      <NavSecretaria />
      <Outlet />
    </>
  );
}