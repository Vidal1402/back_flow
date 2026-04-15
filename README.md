# PHP MVP API

Backend MVP em PHP nativo com padrão em camadas:

- Routes
- Controllers
- Repositories
- Middleware JWT
- MongoDB (`mongodb/mongodb`)

## Executar local

1. Copie `.env.example` para `.env`.
2. Configure `MONGODB_URI`, `APP_KEY`, etc.
3. `composer install`
4. Servidor (router para `/api/*`):
   ```bash
   php -S localhost:8000 -t public public/index.php
   ```

Variáveis: ver `.env.example`.

## Endpoints principais

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (JWT)
- `GET /api/clients` (JWT)
- `POST /api/clients` (JWT admin)
- `GET /api/tasks` (JWT)
- `POST /api/tasks` (JWT)
- `PATCH /api/tasks/{id}/status` (JWT)
- `GET /api/invoices` (JWT)

## Estrutura

- `public/index.php` entrypoint web.
- `src/Core` utilitários de framework.
- `src/Controllers` handlers HTTP.
- `src/Repositories` acesso a dados.
- `src/Middleware` proteção de rotas.
- `database/migrations/001_init.sql` referência legada (Postgres).
- `index.php` na raiz (opcional) inclui `public/index.php`.
- **`Dockerfile`** — deploy no Railway com PHP embutido em `0.0.0.0:$PORT` (sem Caddy/FrankenPHP).

## Deploy no Railway

O projeto usa **`Dockerfile`** + `railway.json` com `"builder": "DOCKERFILE"` — o processo escuta **sempre** em **`0.0.0.0:${PORT}`**, que é o que o Railway espera. Isto evita os 502 causados por FrankenPHP/Caddy/Railpack com `SERVER_NAME` e `PORT` desalinhados.

### Variáveis

- `MONGODB_URI`, `MONGODB_DATABASE`, `APP_KEY`, `JWT_TTL`, `APP_ENV`, `APP_URL`
- **Não** precisas de `RAILPACK_PHP_ROOT_DIR` nem `SERVER_NAME` com esta imagem.

### Rede (Target port)

Em **Networking → Public Networking**, o **Target port** tem de ser **igual** ao **`PORT`** que o Railway mostra nas **Variables** do serviço (muitas vezes **8080**). Se estiveres a apontar para **8000** mas `PORT=8080`, continuas a ter erros.

### MongoDB Atlas

**Network Access:** permite **`0.0.0.0/0`** (ou regra adequada) para o cluster aceitar ligações do Railway.

### Healthcheck

`railway.json` define `healthcheckPath: "/"` — o `GET /` responde JSON sem MongoDB.

### Build

- `composer install` corre na fase de build (stage `vendor`).
- Extensão **mongodb** instalada via PECL na imagem `php:8.4-cli-bookworm`.

Após `git push`, o Railway deve detetar o **Dockerfile** automaticamente (confirmar no painel **Build → Builder** que está a usar Dockerfile e não Railpack).
