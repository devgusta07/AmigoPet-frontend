# AmigoPet Front-end

Front-end React, TypeScript e Vite para a API `amigopet-backend`.

## Executar localmente

Na pasta `amigopet-frontend`:

```powershell
npm install
npm run dev
```

O Vite ficará disponível em `http://localhost:5173`.

Crie um arquivo `.env` com:

```env
VITE_API_URL=http://localhost:8080
```

Inicie o banco e o back-end na pasta `amigopet-backend`:

```powershell
docker compose up -d
.\mvnw.cmd spring-boot:run
```

## Funcionalidades

- Landing page pública com serviços, login e cadastro.
- Login com JWT.
- Sessão protegida por `sessionStorage`.
- Perfil e alteração de senha.
- Cadastro e remoção de animais.
- Consulta, criação e cancelamento de agendamentos.
- Solicitação e redefinição de senha por token.
- Área administrativa protegida pela role `ADMIN`.

O token JWT do back-end expira em cinco minutos e não existe refresh token. Por isso, o front-end verifica o campo `exp`, remove tokens expirados e encerra a sessão após `401`. O `sessionStorage` evita persistência entre sessões do navegador, mas continua acessível ao JavaScript da página; uma política CSP e uma futura migração para cookies `HttpOnly`, `Secure` e `SameSite` são recomendadas para maior proteção contra XSS.

## Validação

```powershell
npm run lint
npm run build
```

O back-end permite CORS somente para `http://localhost:5173`, com os métodos HTTP necessários e os cabeçalhos `Authorization`, `Content-Type` e `Accept`.
