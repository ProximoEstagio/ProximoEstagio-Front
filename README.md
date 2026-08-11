# Próximo Estágio

Sistema de gestão de documentos de estágio para instituições de ensino. Alunos enviam os documentos exigidos (termo de aceite, relatório de atividades, declaração de conclusão), acompanham prazos e status de validação, enquanto a secretaria acompanha quais alunos já concluíram o processo.

Projeto desenvolvido como trabalho acadêmico na Fatec Franco da Rocha "Giuliano Cecchettini" (Desenvolvimento de Software Multiplataforma), atualmente em migração do stack original (Laravel + JavaScript puro) para **Spring Boot + React**.

## Funcionalidades

**Aluno**
- Envio de documentos (Termo A, Relatório B, Declaração C) com anexo de arquivo e recado
- Acompanhamento do progresso de entrega (barra A → B → C)
- Histórico de documentos enviados, com filtro por tipo
- Notificações de prazos vencidos/urgentes
- Edição de perfil e foto

**Secretaria**
- Listagem de alunos que concluíram o processo de estágio
- Filtro por curso
- Visualização dos documentos enviados por cada aluno

## Tecnologias

**Backend**
- Spring Boot
- API REST (autenticação via token)

**Frontend**
- React + Vite
- React Router
- CSS puro (design system próprio — `global.css`)

## Estrutura do repositório

```
backend/                     API Spring Boot
frontend/
  src/
    components/              Componentes reutilizáveis (Nav, popups, dropdown...)
    context/                 Contextos React (dados do aluno, prazos)
    hooks/                   Hooks compartilhados (tema, acessibilidade, logout...)
    layouts/                 Layouts por área (Aluno, Secretaria)
    pages/
      aluno/                 Área do Aluno, Enviados, Perfil
      secretaria/            Alunos Concluídos
      Login.jsx
    services/                Cliente HTTP (api.js)
    constants/
```

## Como rodar

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

A API sobe por padrão em `http://localhost:8080`.

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Crie um arquivo `.env` na pasta `frontend/` com a URL da API:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Se a variável não for definida, o app tenta detectar automaticamente se está rodando em ambiente local.

## Em andamento

- [x] Migração do front-end para React (Área do Aluno, Enviados, Perfil, Login, Secretaria)
- [ ] Migração das telas de Professor
- [ ] Guarda de rota (`ProtectedRoute`) ligada ao endpoint de verificação de token
- [ ] Aplicação completa dos modos de acessibilidade e tema escuro

## 👨‍💻 Desenvolvedores — Próximo Estágio

| Desenvolvedor   | GitHub                                                     |
| --------------- | ---------------------------------------------------------- |
| **Rian Aguiar** | [@RianAguiar](https://github.com/RianAguiar)               |
| **Sales**       | [@Sal3l](https://github.com/Sal3l)                         |
| **Adilson**     | [@adilson0001](https://github.com/adilson0001)             |
| **Henrique**    | [@HenriqueMandri505](https://github.com/HenriqueMandri505) |
| **Lucas**       | [@LucasMarins81](https://github.com/LucasMarins81)         |
| **Eduardo**     | [@eduardojsanches](https://github.com/eduardojsanches)     |
