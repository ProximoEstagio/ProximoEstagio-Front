# Estrutura do projeto

Este documento explica de forma simples a responsabilidade de cada pasta dentro do `src/`.
A ideia é manter o projeto organizado e facilitar a manutenção conforme ele cresce.

---

## 📁 assets/
Responsável por arquivos estáticos utilizados pela aplicação.
Pode conter:
- Imagens
- Ícones
- SVGs
- Fontes
- Outros arquivos estáticos





## 📁 components/
Contém componentes visuais reutilizáveis da aplicação.
São partes menores da interface que podem ser utilizadas em diferentes páginas.
Exemplos:
components/
├── Button/
├── ChatInput/
├── ChatHeader/
├── Message/
├── Modal/
└── Footer/





## 📁 constants/
Contém valores constantes utilizados em diferentes partes da aplicação.
Exemplos:
constants/
├── routes.js
└── chat.js
Um arquivo pode conter:
    export const MAX_MESSAGE_LENGTH = 500
    export const MAX_USERNAME_LENGTH = 50

Isso evita espalhar valores fixos pelo projeto.
Use constants/ para valores que não devem mudar durante a execução da aplicação.





## 📁 context/
Contém os React Contexts utilizados pela aplicação.
O Context permite compartilhar informações entre diferentes componentes sem precisar passar propriedades (props) por vários níveis.
Exemplo:
context/
└── ChatContext.jsx
Um ChatContext poderia compartilhar informações como:
- Estado da conexão
- Usuário atual
- Sala atual
- Informações compartilhadas do chat

Use Context quando diferentes partes da aplicação realmente precisam acessar o mesmo estado.
Não é necessário colocar todo estado da aplicação dentro de um Context.





## 📁 hooks/
Contém Custom Hooks do React.
Hooks são utilizados para organizar e reutilizar lógica relacionada ao React.
Exemplos:
hooks/
├── useChatSocket.js
├── useAutoScroll.js
└── useLocalStorage.js
Um exemplo seria:
const {
    messages,
    sendMessage,
    connected
} = useChatSocket(room)

Assim, a lógica do WebSocket fica separada da interface.
Normalmente, Custom Hooks começam com use.





## 📁 layouts/
Contém estruturas maiores que definem como as páginas são organizadas.
Um Layout pode ser responsável por elementos que aparecem ao redor do conteúdo, como:
- Header
- Footer
- Menu
- Área principal
- Estrutura geral da aplicação
Exemplo:
layouts/
├── MainLayout.jsx
└── ChatLayout.jsx
Um Layout pode ser utilizado assim:
<MainLayout>
    <Home />
</MainLayout>

Layouts definem a estrutura da página, enquanto Components representam partes menores dessa estrutura.






## 📁 pages/
Contém as páginas da aplicação.
Normalmente cada página está relacionada a uma rota.
Exemplo:
pages/
├── Home/
│   └── Home.jsx
├── Chat/
│   └── Chat.jsx
├── About/
│   └── About.jsx
└── NotFound/
    └── NotFound.jsx
Uma página pode reunir vários componentes:
Chat
├── ChatHeader
├── MessageList
├── Message
├── TypingIndicator
└── ChatInput

Se representa uma tela ou rota inteira da aplicação, provavelmente pertence a pages/.





## 📁 services/
Contém a comunicação com serviços externos.
É um bom lugar para organizar:
- Requisições HTTP
- Comunicação com APIs
- WebSockets
- Integrações com serviços externos
Exemplo:
services/
├── api.js
├── chatService.js
└── websocket.js

Em vez de colocar uma requisição diretamente dentro de uma página:
fetch('https://api.exemplo.com/messages')
podemos centralizar essa comunicação em um serviço:
const messages = await getMessages(room)
services/ ajuda a manter a comunicação externa separada da interface.






🧠 Resumo
Pasta	        Responsabilidade
assets      |	Imagens, ícones, fontes e arquivos estáticos
components  |	Partes reutilizáveis da interface
constants	|   Valores constantes da aplicação
context	    |   Estado compartilhado através do React Context
hooks	    |   Lógica reutilizável através de Custom Hooks
layouts	    |   Estrutura geral das páginas
pages 	    |   Páginas e telas da aplicação
services	|   Comunicação com APIs e serviços externos
styles	    |   CSS e estilos globais