/**
 * layouts/AlunoLayout.jsx
 * Layout compartilhado das telas do aluno (equivalente ao <nav></nav> + <div id="popup-layer">
 * repetidos em cada .html original). Usar como elemento pai das rotas /aluno/* no react-router.
 *
 * Exemplo de uso (App.jsx):
 *
 *   <Routes>
 *     <Route element={<AlunoLayout />}>
 *       <Route path="/aluno" element={<AreaAluno />} />
 *       <Route path="/aluno/enviados" element={<Enviados />} />
 *       <Route path="/aluno/perfil" element={<Perfil />} />
 *     </Route>
 *   </Routes>
 */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import InfoEstagioPopup from '../components/alunos/InfoEstagioPopup';
import NotificacoesPopup from '../components/alunos/NotificacoesPopup';
import PrazosPopup from '../components/alunos/PrazosPopup';
import { DocumentosProvider } from '../context/DocumentosContext';

export default function AlunoLayout() {
  const [infoAberto, setInfoAberto] = useState(false);

  return (
    <DocumentosProvider>
      <Nav onAbrirInfo={() => setInfoAberto(true)} />

      <Outlet />

      <InfoEstagioPopup aberto={infoAberto} onFechar={() => setInfoAberto(false)} />
      <NotificacoesPopup />
      <PrazosPopup />
    </DocumentosProvider>
  );
}