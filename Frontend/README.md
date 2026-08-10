# Refatoração Aluno — Laravel/Blade → React

## Estrutura gerada

```
services/api.js                    Wrapper de fetch (Api.get/post/upload/download)
context/DocumentosContext.jsx      Fetch central de /aluno/documentos (progresso, sino, listas)
components/Nav.jsx                 Barra de navegação
components/InfoEstagioPopup.jsx    Popup "O que é estágio"
components/NotificacoesPopup.jsx   Popup automático de prazos vencidos/urgentes
components/PrazosPopup.jsx         Popup de todos os prazos (clique no sino)
layouts/AlunoLayout.jsx            Layout com Nav + Provider + popups (usar com react-router)
pages/aluno/AreaAluno.jsx          area_aluno.html
pages/aluno/Enviados.jsx           enviados.html
pages/aluno/Perfil.jsx             perfil.html
```

## Dependências

- `react-router-dom` (Nav e Perfil usam `Link`/`useNavigate`)
- Variável de ambiente `VITE_API_BASE_URL` no `.env` do Vite, ex:
  ```
  VITE_API_BASE_URL=http://localhost:8000/api
  ```

## Exemplo de rotas (App.jsx)

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlunoLayout from './layouts/AlunoLayout';
import AreaAluno from './pages/aluno/AreaAluno';
import Enviados from './pages/aluno/Enviados';
import Perfil from './pages/aluno/Perfil';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AlunoLayout />}>
          <Route path="/aluno" element={<AreaAluno />} />
          <Route path="/aluno/enviados" element={<Enviados />} />
          <Route path="/aluno/perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

## O que mudou de arquitetura (Blade/DOM → React)

- Toda manipulação direta de `document.getElementById(...).innerHTML` virou
  **estado** (`useState`) + JSX.
- `progresso.js` e `sino.js` faziam fetches duplicados no mesmo endpoint
  `/aluno/documentos`; isso foi centralizado em `DocumentosContext`, usado
  tanto pela Nav (badge do sino) quanto pelas páginas Área do Aluno e Enviados.
- O `<div id="popup-layer">` único que trocava de conteúdo virou 3 componentes
  de popup independentes, cada um controlando sua própria visibilidade.
- `localStorage` continua sendo usado exatamente como no original (idaluno,
  nomeUser, emailUser, foto, etc.) — nenhuma mudança de fonte de dados.

## Ainda não portado (arquivos originais não foram enviados)

- `public/script/config.js` e `api.js` — substituídos por `services/api.js`,
  mas confira se a interface bate com o backend real (parâmetros extras,
  tratamento de erro específico, etc.)
- `dropdown.js` — menu suspenso genérico
- `acessibilidade.js` — aplicação real dos modos (deuteranopia, alto
  contraste etc.) no `<body>`; hoje os botões existem mas não fazem nada
- `script.js` — inclui o toggle de tema claro/escuro (`#alternador`) e
  provavelmente o menu hamburguer mobile
- `requireLogin.js` — guarda de rota (redirecionar se não autenticado);
  no React isso normalmente vira um componente `<ProtectedRoute>` ou
  verificação no layout/router
- `logout.js` — hoje só limpo o `localStorage`, mas o original pode fazer
  uma chamada ao backend para invalidar sessão/token

Quando tiver esses arquivos, me manda que eu porto do mesmo jeito.