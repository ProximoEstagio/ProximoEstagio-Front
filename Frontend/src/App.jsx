import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AlunoLayout from './layouts/AlunoLayout';
import SecretariaLayout from './layouts/SecretariaLayout';
import ProfessorLayout from './layouts/ProfessorLayout';

import Login from './pages/Login';

import AreaAluno from './pages/aluno/AreaAluno';
import Enviados from './pages/aluno/Enviados';
import Perfil from './pages/aluno/Perfil';

import AlunosConcluidos from './pages/secretaria/AlunosConcluidos';

import AlunosProfessor from './pages/professor/Alunos';
import AlunoDetalheProfessor from './pages/professor/AlunoDetalhe';
import DocumentosProfessor from './pages/professor/Documentos';
import ModelosProfessor from './pages/professor/Modelos';
import PerfilProfessor from './pages/professor/Perfil';
import AdminProfessor from './pages/professor/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AlunoLayout />}>
          <Route path="/aluno" element={<AreaAluno />} />
          <Route path="/aluno/enviados" element={<Enviados />} />
          <Route path="/aluno/perfil" element={<Perfil />} />
        </Route>
        <Route element={<SecretariaLayout />}>
          <Route path="/secretaria" element={<AlunosConcluidos />} />
        </Route>
        <Route element={<ProfessorLayout />}>
          <Route path="/professor/alunos" element={<AlunosProfessor />} />
          <Route path="/professor/aluno/:id" element={<AlunoDetalheProfessor />} />
          <Route path="/professor/documentos" element={<DocumentosProfessor />} />
          <Route path="/professor/modelos" element={<ModelosProfessor />} />
          <Route path="/professor/perfil" element={<PerfilProfessor />} />
          <Route path="/professor/admin" element={<AdminProfessor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

