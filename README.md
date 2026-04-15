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
4. `php -S localhost:8000 -t public`

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
- `index.php` na **raiz** do repo inclui `public/index.php` (útil quando o document root no contentor é `/app`).

## Deploy no Railway (Railpack)

O Railpack **não oferece PHP 8.1** — use `"php": "^8.2"` ou superior no `composer.json`.

### Variáveis no Railway

- `MONGODB_URI`, `MONGODB_DATABASE`, `APP_KEY`, `JWT_TTL`, `APP_ENV`, `APP_URL`
- Opcional mas recomendado: **`RAILPACK_PHP_ROOT_DIR=/app/public`** (FrankenPHP serve a pasta `public/`).
- O Railpack escuta em **`{$PORT}`** (o Railway define `PORT`); não fixes porta manualmente.

### MongoDB Atlas

Em **Network Access**, permite IPs de saída do Railway (ex.: **`0.0.0.0/0`** para testes) — senão a app pode ficar à espera da base e o proxy dá timeout.

### "Application failed to respond"

Mensagem do **proxy** do Railway: não recebeu resposta HTTP a tempo ou a ligação falhou.

1. **Confirma que o último deploy inclui** `index.php` na raiz (ver acima) **ou** define `RAILPACK_PHP_ROOT_DIR=/app/public`.
2. **Logs do deploy**: erros PHP (vendor em falta, `MONGODB_URI` vazia, fatal no bootstrap).
3. **`GET /`** deve responder JSON rápido **sem** MongoDB; **`GET /api/health`** precisa de MongoDB — se só `/api/health` falhar, verifica Atlas e `MONGODB_URI`.
4. Os avisos nos logs (HTTP/2 sem TLS, Caddyfile `fmt`, HTTPS desativado **dentro** do contentor) são **normais**; o Railway termina TLS na frente.

Os logs que mostraste ("FrankenPHP started", "server running") indicam que o processo **subiu**; o problema costuma ser **rota/porta/healthcheck**, **timeout para o MongoDB**, ou **crash só ao processar pedidos**.
