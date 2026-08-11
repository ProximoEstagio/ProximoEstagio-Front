Estrutura ideal de acordo com boas práticas

proximo-estagio/
│
├── backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── br/
│   │   │   │       └── com/
│   │   │   │           └── proximoestagio/
│   │   │   │               │
│   │   │   │               ├── ProximoEstagioApplication.java
│   │   │   │               │
│   │   │   │               ├── config/
│   │   │   │               │   ├── SecurityConfig.java
│   │   │   │               │   ├── CorsConfig.java
│   │   │   │               │   └── OpenApiConfig.java
│   │   │   │               │
│   │   │   │               ├── usuario/
│   │   │   │               │   ├── controller/
│   │   │   │               │   ├── service/
│   │   │   │               │   ├── repository/
│   │   │   │               │   ├── model/
│   │   │   │               │   └── dto/
│   │   │   │               │
│   │   │   │               ├── estagio/
│   │   │   │               │   ├── controller/
│   │   │   │               │   ├── service/
│   │   │   │               │   ├── repository/
│   │   │   │               │   ├── model/
│   │   │   │               │   └── dto/
│   │   │   │               │
│   │   │   │               ├── documento/
│   │   │   │               │   ├── controller/
│   │   │   │               │   ├── service/
│   │   │   │               │   ├── repository/
│   │   │   │               │   ├── model/
│   │   │   │               │   └── dto/
│   │   │   │               │
│   │   │   │               ├── notificacao/
│   │   │   │               │   ├── controller/
│   │   │   │               │   ├── service/
│   │   │   │               │   ├── repository/
│   │   │   │               │   ├── model/
│   │   │   │               │   └── dto/
│   │   │   │               │
│   │   │   │               └── exception/
│   │   │   │                   ├── GlobalExceptionHandler.java
│   │   │   │                   ├── ResourceNotFoundException.java
│   │   │   │                   └── BusinessException.java
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       └── application-prod.properties
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Header/
│   │   │   └── Modal/
│   │   │
│   │   ├── pages/
│   │   │   ├── Login/
│   │   │   ├── Dashboard/
│   │   │   ├── Estagios/
│   │   │   └── Documentos/
│   │   │
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── usuarioService.js
│   │   │   ├── estagioService.js
│   │   │   └── documentoService.js
│   │   │
│   │   ├── hooks/
│   │   │
│   │   ├── utils/
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── docs/
│   ├── arquitetura/
│   ├── requisitos/
│   └── diagramas/
│
├── .gitignore
├── README.md
└── docker-compose.yml