# Refatoração das páginas do Professor → React

Este documento descreve a migração das páginas do professor (HTML + JS puro,
consumindo a API Laravel) para componentes React, seguindo os mesmos padrões
já estabelecidos na migração das áreas do aluno e da secretaria.

## O que foi substituído

| Original (HTML + JS)                                   | Novo (React)                              |
|----------------------------------------------------------|--------------------------------------------|
| `admin.html` + `scripts/admin.js`                         | `pages/professor/Admin.jsx`                |
| `aluno.html` + `scripts/alunoDetalhe.js`                   | `pages/professor/AlunoDetalhe.jsx`         |
| `alunos.html` + `scripts/listaAlunos.js` + `scripts/popupCadastro.js` + `scripts/uploadPlanilha.js` | `pages/professor/Alunos.jsx` |
| `documentos.html` + `scripts/documentos.js` + `scripts/popupDocumento.js` | `pages/professor/Documentos.jsx` |
| `modelos.html` + `scripts/modelo.js` + `scripts/popupModelo.js`           | `pages/professor/Modelos.jsx`    |
| `perfil.html` + `scripts/perfil.js`                        | `pages/professor/Perfil.jsx`               |
| `scripts/nav.js`                                           | `components/NavProfessor.jsx`              |
| `<div id="popup-layer">` (repetido em cada popup)          | `components/PopupLayer.jsx` (novo, genérico) |

Os arquivos `scripts/popupModelo copy.js` e `scripts/popupModelo copy 2.js`
não foram portados — pareciam versões antigas/WIP do `popupModelo.js` e a
versão final (`popupModelo.js`) já cobre o fluxo completo.

## Arquivos criados

```
src/
├── App.jsx                              (atualizado com as rotas /professor/*)
├── layouts/
│   └── ProfessorLayout.jsx              (Nav + <Outlet/>, igual SecretariaLayout)
├── components/
│   ├── NavProfessor.jsx                 (substitui scripts/nav.js)
│   └── PopupLayer.jsx                   (wrapper genérico de popup, novo)
└── pages/professor/
    ├── Alunos.jsx
    ├── AlunoDetalhe.jsx
    ├── Documentos.jsx
    ├── Modelos.jsx
    ├── Perfil.jsx
    └── Admin.jsx
```

## Rotas adicionadas (`App.jsx`)

| Rota                        | Componente          | Observação                                   |
|------------------------------|----------------------|------------------------------------------------|
| `/professor/alunos`          | `Alunos.jsx`         | lista, filtro, paginação, CSV, cadastro manual |
| `/professor/aluno/:id`       | `AlunoDetalhe.jsx`   | antes era `aluno.html?id=`, agora é rota dinâmica |
| `/professor/documentos`      | `Documentos.jsx`     | dashboard + filtros + avaliação de documento   |
| `/professor/modelos`         | `Modelos.jsx`        | modelos A/B/C + upload                         |
| `/professor/perfil`          | `Perfil.jsx`         | dados pessoais + foto                          |
| `/professor/admin`           | `Admin.jsx`          | só admin — redireciona pra `/professor/alunos` se `localStorage.nivel !== 'admin'` |

## Código reaproveitado (nada duplicado)

- **`services/api.js`** (`Api.get/post/upload/download`, `BASE_URL_STATIC`) —
  usado em todas as páginas novas, sem reescrever nada de fetch/token/base URL.
- **Hooks já existentes**: `useMenuMobile`, `useTema`, `useLogout`,
  `useClickOutside`, `components/AcessibilidadeMenu.jsx` — usados no
  `NavProfessor.jsx` do mesmo jeito que em `Nav.jsx` (aluno) e
  `NavSecretaria.jsx`.
- **Padrão de layout**: `ProfessorLayout.jsx` é uma cópia estrutural de
  `SecretariaLayout.jsx` (`<Nav/>` + `<Outlet/>`).
- **Padrão de popup**: o `#popup-layer.active > .popup.container` visto em
  `InfoEstagioPopup.jsx` virou o componente genérico `PopupLayer.jsx`,
  reaproveitado nos 4 popups do professor (cadastro de aluno, avaliação de
  documento, upload de modelo e os 3 popups do Admin).
- **Padrão de filtro por checkbox** (`option-wrapper` / `custom-box`) e de
  **linha expansível de tabela**, ambos vistos em
  `pages/secretaria/AlunosConcluidos.jsx`, reaproveitados em
  `Documentos.jsx` (filtro) e `Alunos.jsx` (tabela).
- **`pages/professor/Perfil.jsx`** é essencialmente o mesmo fluxo de
  `pages/aluno/Perfil.jsx` (edição inline, upload de foto), só trocando o
  logout local pelo hook `useLogout` compartilhado.

## Pontos de atenção

1. **Link para o detalhe do aluno** (`Alunos.jsx`) abre em nova aba
   (`target="_blank"`), igual ao HTML original. Numa SPA isso recarrega a
   aplicação do zero nessa aba; se preferir navegação client-side normal,
   é só remover o `target`.
2. **Após validar em produção**, as pastas antigas podem ser apagadas:
   `pages/professor/*.html` e `pages/professor/scripts/`.
3. **Lint**: rodando `npm run lint` nos arquivos novos aparecem avisos das
   regras `react-hooks/set-state-in-effect` e `react-hooks/immutability`
   (plugin `eslint-plugin-react-hooks` v7, bem mais rígido). Esse mesmo
   padrão (chamar `setState` dentro de `useEffect`, declarar a função de
   carregamento depois do `useEffect` que a chama) já existe em
   `pages/aluno/Perfil.jsx` e `pages/secretaria/AlunosConcluidos.jsx` — não é
   uma regressão introduzida aqui, é um padrão do projeto que essa versão
   mais nova do lint não deixa passar. Vale uma limpeza geral (não só nas
   páginas do professor) se quiser zerar o lint.
4. **`npm run build` rodado e passou limpo** (75 módulos, sem erros) antes
   de entregar.