dia 2 refatorando prompt: (enviei os arquivos de nav.js,secretaria.js e secretaria.html) e refaça essa parte tbm analise as partes que vc já refez e so puxe na pagina jsx

# Refatoração Aluno — Laravel/Blade → React

## Estrutura gerada

```
services/api.js                        Wrapper de fetch (Api.get/post/upload/download)
constants/acessibilidade.js            Lista de modos de acessibilidade (compartilhada entre Navs)
hooks/useLogout.js                     Logout compartilhado (aluno + secretaria)
context/DocumentosContext.jsx          Fetch central de /aluno/documentos (progresso, sino, listas)

components/Nav.jsx                     Barra de navegação — Aluno
components/InfoEstagioPopup.jsx        Popup "O que é estágio" — Aluno
components/NotificacoesPopup.jsx       Popup automático de prazos vencidos/urgentes — Aluno
components/PrazosPopup.jsx             Popup de todos os prazos (clique no sino) — Aluno
components/NavSecretaria.jsx           Barra de navegação — Secretaria

layouts/AlunoLayout.jsx                Nav + Provider + popups do Aluno
layouts/SecretariaLayout.jsx           Nav da Secretaria (sem provider/popups)

pages/aluno/AreaAluno.jsx              area_aluno.html
pages/aluno/Enviados.jsx               enviados.html
pages/aluno/Perfil.jsx                 perfil.html
pages/secretaria/AlunosConcluidos.jsx  secretaria.html
pages/Login.jsx                        index.html (login) — pronto para API Spring Boot
```

### Peças reaproveitadas entre Aluno e Secretaria

- `MODOS_ACESSIBILIDADE` (antes duplicado em cada Nav) agora vive em
  `constants/acessibilidade.js` e é importado tanto por `Nav.jsx` quanto por
  `NavSecretaria.jsx`.
- `useLogout()` centraliza a lógica de logout, usada em `pages/aluno/Perfil.jsx`
  (botão "Sair") e em `components/NavSecretaria.jsx` (botão de logout na barra).
- `services/api.js` é o mesmo cliente HTTP para todas as telas.

## Dependências

- `react-router-dom` (Nav, Perfil e Login usam `Link`/`useNavigate`)
- Variável de ambiente `VITE_API_BASE_URL` no `.env` do Vite. Backend agora é
  Spring Boot, então aponte para a porta/base dele, ex:
  ```
  VITE_API_BASE_URL=http://localhost:8080/api
  ```

## Login (Spring Boot)

`pages/Login.jsx` trata dois formatos de erro de autenticação:
- Estilo antigo (Laravel): resposta `200 OK` com `{ erro: '...' }` no corpo.
- Estilo Spring Boot: status HTTP de erro (401/403) com corpo
  `{ message: '...' }` — `services/api.js` já converte isso num `Error`
  capturado no `catch` do componente.

Se o seu backend Spring usa nomes de campo diferentes (ex: `senha` vs
`password`, `token` vs `accessToken`), ajuste o corpo enviado em `Api.post('/login', ...)`
e a leitura de `data.token` em `Login.jsx`.

## Exemplo de rotas (App.jsx)

```jsx
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
```

Lembre de atualizar `MAPA_PAGINAS` em `pages/Login.jsx` para incluir a rota
da secretaria (ex: `'secretaria/secretaria.html': '/secretaria'`), conforme
o valor real que o backend retorna no campo `page`

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