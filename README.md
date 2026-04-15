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
- **`RAILPACK_PHP_ROOT_DIR=/app/public`** (recomendado): FrankenPHP usa a pasta `public/`.
- **`SERVER_NAME=:${{PORT}}`** (muitas vezes **necessário**): a imagem Railpack define `SERVER_NAME=:80` no build, mas o Railway encaminha o tráfego para a porta em **`PORT`** (ex.: 8080). Sem esta variável, o Caddy pode ficar à escuta na **80** e o proxy não encontra serviço na **PORT** → *Application failed to respond*. No painel Railway → Variables → novo valor `SERVER_NAME` = `:${{PORT}}` (sintaxe de referência do Railway).

O Railway injeta **`PORT`** automaticamente; não defines outra porta à mão salvo saberes o que estás a fazer.

### Rede pública (502 Bad Gateway)

No painel **Networking → Public Networking → Target port**:

- O valor tem de ser **o mesmo** que a variável **`PORT`** do serviço (vê em **Variables**; costuma ser **8000** ou **8080** consoante o projeto).
- Se definires **Target port = 8000** mas o contentor só escuta na **80** (comportamento Railpack sem correcção), o proxy devolve **502**.
- Este repositório define **`startCommand`** em `railway.json` para fazer `SERVER_NAME=:$PORT` antes de `/start-container.sh`, alinhando o Caddy com a **`PORT`** do Railway.
- Alternativa no painel: variável **`SERVER_NAME`** = `:${{PORT}}` (referência ao `PORT` do mesmo serviço).

### MongoDB Atlas

Em **Network Access**, permite IPs de saída do Railway (ex.: **`0.0.0.0/0`** para testes) — senão a app pode ficar à espera da base e o proxy dá timeout.

### "Application failed to respond"

Mensagem do **proxy** do Railway: não recebeu resposta HTTP a tempo ou a ligação falhou.

1. **`SERVER_NAME=:${{PORT}}`** (ver secção acima) — causa mais comum com FrankenPHP/Railpack quando os logs dizem "server running" mas o site não responde.
2. **`RAILPACK_PHP_ROOT_DIR=/app/public`** ou **`index.php`** na raiz do repositório (já incluído neste projeto).
3. **MongoDB Atlas → Network Access** (ex.: `0.0.0.0/0`) e **`MONGODB_URI`** correta.
4. **Logs**: erros PHP (vendor em falta, fatal no bootstrap). **`GET /`** deve responder JSON **sem** MongoDB; **`GET /api/health`** testa MongoDB.
5. Avisos nos logs (HTTP/2/3 sem TLS, Caddyfile `fmt`, HTTPS off **no contentor**) são **normais**.

Os logs "FrankenPHP started" / "server running" só dizem que o **processo** arrancou; se a porta não coincidir com **`PORT`**, o utilizador vê na mesma *Application failed to respond*.
