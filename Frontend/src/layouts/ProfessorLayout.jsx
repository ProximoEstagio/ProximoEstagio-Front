/**
 * layouts/ProfessorLayout.jsx
 * Substitui o <nav></nav> + scripts/nav.js repetido em todas as páginas do
 * professor. Segue o mesmo padrão de AlunoLayout.jsx / SecretariaLayout.jsx.
 */
import { Outlet } from 'react-router-dom';
import NavProfessor from '../components/professor/NavProfessor';

export default function ProfessorLayout() {
  return (
    <>
      <NavProfessor />
      <Outlet />
    </>
  );
}
