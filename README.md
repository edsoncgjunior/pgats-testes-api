
# API de Transferências (REST + GraphQL)

- **Autenticação JWT**
- **REST e GraphQL**
- **Testes automatizados** com **Mocha + Chai + Supertest** (nível External)
- **Testes de Controller** com **Sinon**
- **CI no GitHub Actions** (gera Mochawesome)
- **Swagger** em `/docs`

## Requisitos
- Node.js 18+
- (Opcional) Docker
- Configurar `JWT_SECRET` (use `.env` ou `secrets` no CI)

## Como rodar localmente
```bash
cp .env.example .env
npm install
npm start               # REST em http://localhost:3000
npm run start:graphql   # GraphQL em http://localhost:4000/graphql
```

### Endpoints
- `POST /api/login` — body: `{ "email": "edson@teste.com", "senha": "edson123" }`
- `POST /api/transferencias` (Bearer token)
- `GET /api/transferencias` (Bearer token)
- **Swagger**: `GET /docs`

## Testes
- **Todos os testes**: `npm test`
- **Somente controller (Sinon)**: `npm run test:unit`
- **Somente External (REST + GraphQL)**: `npm run test:api`

Relatórios Mochawesome em `mochawesome-report/`.

## Docker (opcional)
```bash
docker build -t api-edson .
docker run --rm -p 3000:3000 -e JWT_SECRET=segredo api-edson
```

## CI (GitHub Actions)
Workflow em `.github/workflows/ci.yml`:
- Instala deps (`npm ci`)
- Roda testes
- Publica relatório Mochawesome como artefato

## Usuários de exemplo
- **Edson** — `edson@teste.com` / `edson123`
- **Edson2** — `edson2@teste.com` / `edson456`


## Como instalar e executar (atualizado)

> **Importante:** o projeto não inclui `package-lock.json`. Instale as dependências com `npm install` localmente e no CI.

### Local
```bash
npm install
npm start
# testes
npm test
```

### Variáveis de ambiente
Crie um arquivo `.env` na raiz com:
```
JWT_SECRET=segredo-edson-muito-seguro
PORT=3000
```

### Swagger
- UI: `http://localhost:3000/docs`
- GraphQL: `http://localhost:3000/graphql`

### CI (GitHub Actions)
O workflow foi ajustado para usar `npm install`. Crie o secret `JWT_SECRET` em **Settings → Secrets and variables → Actions**.
