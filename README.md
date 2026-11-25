# 🐾 AmigoPet — Frontend

Interface web do AmigoPet, uma aplicação desenvolvida com o objetivo de oferecer um ecossistema administrativo para um pet shop.

O frontend permite que usuários e administradores interajam com as funcionalidades disponibilizadas pelo backend, respeitando os níveis de acesso de cada perfil.

**Acesse a aplicação:** https://amigopet-frontend.vercel.app/

## Tecnologias utilizadas

- React
- Vite
- JavaScript

## Funcionalidades

- Interface de autenticação e cadastro.
- Login de usuários.
- Recuperação de senha.
- Área de usuário.
- Área administrativa com acesso conforme as permissões do usuário.
- Integração com API REST.
- Gerenciamento de animais.

## Integração com Backend

O frontend consome a API REST desenvolvida em Java e Spring Boot.

**Repositório do Backend:** https://github.com/devgusta07/AmigoPet-Backend

**API em produção:** https://amigopet-backend-uua0.onrender.com

## Executando localmente

É possível executar o frontend localmente utilizando o backend já publicado.

### 1. Clone o repositório

```bash
git clone https://github.com/devgusta07/amigopet-frontend.git
```

### 2. Entre na pasta do projeto

```bash
cd amigopet-frontend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure a variável de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://amigopet-backend-uua0.onrender.com
```

Essa variável define o endereço da API que será consumida pelo frontend.

### 5. Execute a aplicação

```bash
npm run dev
```

O Vite disponibilizará o endereço local da aplicação no terminal.

## Deploy

O frontend está hospedado na Vercel, com integração ao GitHub para publicação das atualizações.

## Desenvolvimento

O frontend foi desenvolvido integralmente com auxílio do GitHub Copilot, utilizado como ferramenta de apoio na implementação da interface.

O processo de integração e publicação da aplicação também contou com auxílio intensivo do ChatGPT.

A utilização dessas ferramentas fez parte do processo de desenvolvimento e aprendizado, incluindo integração com API, configuração de ambientes e resolução de problemas de comunicação entre frontend e backend.

---

Desenvolvido como parte do projeto AmigoPet.
