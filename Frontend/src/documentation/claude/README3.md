# Refatoração Aluno/Secretaria — Laravel/Blade → React

## Estrutura gerada

```
services/api.js                        Cliente HTTP (Api.get/post/upload/download) + auto-detecção local/produção
constants/acessibilidade.js            Lista de modos de acessibilidade (compartilhada entre Navs)

hooks/useClickOutside.js               Fecha menu/dropdown ao clicar fora (genérico)
hooks/useTema.js                       Tema claro/escuro (aplica atributo `tema` no <html>)
hooks/useAcessibilidade.js             Modo de acessibilidade (aplica atributo `acessibilidade` no <html>)
hooks/useMenuMobile.js                 Toggle do menu hamburguer mobile
hooks/useLogout.js                     Logout (chama API + limpa localStorage) — aluno + secretaria

context/DocumentosContext.jsx          Fetch central de /aluno/documentos (progresso, sino, listas)

components/Nav.jsx                     Barra de navegação — Aluno
components/NavSecretaria.jsx           Barra de navegação — Secretaria
components/AcessibilidadeMenu.jsx      Submenu de acessibilidade (usado pelas duas Navs)
components/InfoEstagioPopup.jsx        Popup "O que é estágio" — Aluno
components/NotificacoesPopup.jsx       Popup automático de prazos vencidos/urgentes — Aluno
components/PrazosPopup.jsx             Popup de todos os prazos (clique no sino) — Aluno
components/Dropdown.jsx (+ .css)       Dropdown customizado genérico (substitui o Web Component original)
components/ProtectedRoute.jsx          Guarda de rota — verifica token antes de liberar acesso

layouts/AlunoLayout.jsx                Nav + Provider + popups do Aluno
layouts/SecretariaLayout.jsx           Nav da Secretaria (sem provider/popups)

pages/aluno/AreaAluno.jsx              area_aluno.html
pages/aluno/Enviados.jsx               enviados.html
pages/aluno/Perfil.jsx                 perfil.html
pages/secretaria/AlunosConcluidos.jsx  secretaria.html
pages/Login.jsx                        index.html (login) — pronto para API Spring Boot
```

## Dependências

- `react-router-dom` (Nav, Perfil, Login e ProtectedRoute usam `Link`/`useNavigate`/`Navigate`/`Outlet`)
- Variável de ambiente `VITE_API_BASE_URL` no `.env` do Vite. Backend agora é
  Spring Boot, então aponte para a porta/base dele, ex:
  ```
  VITE_API_BASE_URL=http://localhost:8080/api
  ```
  Se não definir essa variável, `services/api.js` cai automaticamente na
  mesma lógica de `config.js` original (detecta localhost/127.0.0.1 e usa a
  própria origem; senão usa `PRODUCTION_DOMAIN`, que você deve ajustar no
  próprio arquivo).

## Peças reaproveitadas entre Aluno e Secretaria

- `MODOS_ACESSIBILIDADE` (`constants/acessibilidade.js`) e o componente
  `AcessibilidadeMenu` — usados tanto por `Nav.jsx` quanto por `NavSecretaria.jsx`.
- `useMenuMobile()` — toggle do hamburguer, usado pelas duas Navs.
- `useTema()` — alternador claro/escuro, usado pelas duas Navs.
- `useLogout()` — usado em `pages/aluno/Perfil.jsx` (botão "Sair") e em
  `components/NavSecretaria.jsx` (botão de logout na barra).
- `useClickOutside()` — usado por `AcessibilidadeMenu`, `useMenuMobile` e `Dropdown`.
- `services/api.js` — mesmo cliente HTTP para todas as telas.

## Autenticação (requireLogin.js -> ProtectedRoute)

O `requireLogin.js` original era incluído sem `defer` antes de tudo, bloqueando
a página inteira até confirmar o token. Em SPA isso vira um componente de rota
que envolve as páginas protegidas — veja `ProtectedRoute` no exemplo de rotas
abaixo. Ele chama `/verificar-token` e redireciona para `/login` se inválido.

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
import ProtectedRoute from './components/ProtectedRoute';
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

        <Route element={<ProtectedRoute />}>
          <Route element={<AlunoLayout />}>
            <Route path="/aluno" element={<AreaAluno />} />
            <Route path="/aluno/enviados" element={<Enviados />} />
            <Route path="/aluno/perfil" element={<Perfil />} />
          </Route>
          <Route element={<SecretariaLayout />}>
            <Route path="/secretaria" element={<AlunosConcluidos />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

Lembre de atualizar `MAPA_PAGINAS` em `pages/Login.jsx` para incluir a rota
da secretaria (ex: `'secretaria/secretaria.html': '/secretaria'`), conforme
o valor real que o backend retorna no campo `page`.

## O que mudou de arquitetura (Blade/DOM → React)

- Toda manipulação direta de `document.getElementById(...).innerHTML` virou
  **estado** (`useState`) + JSX.
- `progresso.js` e `sino.js` faziam fetches duplicados no mesmo endpoint
  `/aluno/documentos`; isso foi centralizado em `DocumentosContext`.
- O `<div id="popup-layer">` único que trocava de conteúdo virou 3 componentes
  de popup independentes.
- O toggle de tema, o modo de acessibilidade e o menu hamburguer — que
  manipulavam classes via `classList` direto no DOM — viraram hooks
  (`useTema`, `useAcessibilidade`, `useMenuMobile`) que guardam o estado no
  React e sincronizam com `localStorage` + atributos do `<html>`, do mesmo
  jeito que o original fazia.
- O Web Component `<custom-dropdown>` (Shadow DOM) virou `Dropdown.jsx`
  controlado por props; os estilos que estavam isolados no Shadow DOM foram
  para `Dropdown.css`.
- `logout.js` virou `useLogout()`: chama `/logout` na API e limpa o
  `localStorage` mesmo se a chamada falhar (mesmo comportamento do `finally`
  original).    
- `requireLogin.js` virou `ProtectedRoute.jsx`, um componente de rota que
  verifica o token via `/verificar-token` antes de liberar as páginas filhas.
- `localStorage` continua sendo usado exatamente como no original (idaluno,
  nomeUser, emailUser, foto, tema, modoAcessibilidade etc.).

## Ainda não portado

- CSS de `.menu-acess.visible`, `.nav-left.visible`, `.invisible` etc. —
  as classes continuam sendo aplicadas do mesmo jeito que o original, então
  seu CSS existente deve funcionar sem alteração.
- `atualizarAtivos()` do `acessibilidade.js` virou a prop `className` com
  `.ativo` no botão selecionado dentro de `AcessibilidadeMenu.jsx` — confira
  se o nome da classe bate com seu CSS.

Se tiver mais arquivos (páginas de professor, etc.), manda que eu porto do
mesmo jeito, reaproveitando essas mesmas peças.