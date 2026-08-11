import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlunoLayout from './layouts/AlunoLayout';
import SecretariaLayout from './layouts/SecretariaLayout';
import Login from './pages/Login';
import AreaAluno from './pages/aluno/AreaAluno';
import Enviados from './pages/aluno/Enviados';
import Perfil from './pages/aluno/Perfil';
import AlunosConcluidos from './pages/secretaria/AlunosConcluidos';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App
