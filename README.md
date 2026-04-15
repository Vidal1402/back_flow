# PHP MVP API

Backend MVP em PHP nativo com padrão em camadas:

- Routes
- Controllers
- Repositories
- Middleware JWT
- Migrações SQL

## Executar local (Supabase Postgres)

1. Copie `.env.example` para `.env`.
2. Configure `DB_DSN`, `DB_USER` e `DB_PASS` com os dados do seu projeto Supabase.
3. Rode `composer install` (opcional se quiser autoload PSR-4 via Composer).
4. Rode `php -S localhost:8000 -t public`.

### Exemplo de conexao no `.env`

`DB_DSN=pgsql:host=db.<project-ref>.supabase.co;port=5432;dbname=postgres;sslmode=require`

`DB_USER=postgres`

`DB_PASS=<senha-do-banco>`

Obs.: esta API usa Supabase como banco Postgres (PDO), com JWT proprio no backend (nao usa Supabase Auth).

## Endpoints principais

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me` (JWT)
- `POST /api/admin/users` (JWT admin)
- `GET /api/clients` (JWT)
- `POST /api/clients` (JWT admin)
- `GET /api/tasks` (JWT)
- `POST /api/tasks` (JWT)
- `PATCH /api/tasks/{id}/status` (JWT)
- `GET /api/invoices` (JWT)

### Criacao de usuarios

- `POST /api/auth/register` retorna `403` (registro publico desativado).
- Novos usuarios devem ser criados por admin em `POST /api/admin/users`.

## Estrutura

- `public/index.php` entrypoint web.
- `src/Core` utilitários de framework.
- `src/Controllers` handlers HTTP.
- `src/Repositories` acesso a dados.
- `src/Middleware` proteção de rotas.
- `database/migrations` schema SQL versionado.

## Deploy no Railway (Railpack)

O Railpack **nao oferece PHP 8.1** — use `composer.json` com `"php": "^8.2"` ou superior.

### Document root

Em muitos deploys o document root e **`/app`** (raiz do repo), nao `/app/public`. Por isso existe **`index.php` na raiz** redirecionando para `public/index.php`.

Opcionalmente no Railway voce pode definir:

- `RAILPACK_PHP_ROOT_DIR=/app/public`

Se definir isso, o Caddy usa `public/` diretamente; o `index.php` da raiz continua inofensivo.

Configure tambem `APP_KEY`, `JWT_TTL`, `DB_DSN`, `DB_USER`, `DB_PASS` nas variaveis do Railway.

### "Application failed to respond" no Railway

O health check costuma bater em `/` ou `/api/health`. Antes, o codigo conectava ao Postgres **antes** de qualquer resposta; se `DB_*` estivesse errado, ate o health falhava.

Agora `GET /`, `GET /health` e `GET /api/health` respondem **sem banco**. Se a raiz voltar a responder mas as rotas `/api/*` derem erro, o problema esta nas variaveis `DB_*` ou na rede ate o Supabase.
