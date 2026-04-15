# PHP MVP API

Backend MVP em PHP nativo com padrão em camadas:

- Routes
- Controllers
- Repositories
- Middleware JWT
- MongoDB (driver oficial `mongodb/mongodb`)

## Executar local (MongoDB Atlas)

1. Copie `.env.example` para `.env`.
2. Configure `MONGODB_URI` com a connection string do Atlas (e opcionalmente `MONGODB_DATABASE` se a URI não tiver o nome da base no path).
3. Rode `composer install` (veja **Composer no Windows** abaixo se o comando não existir ou der erro de SSL).
4. Rode `php -S localhost:8000 -t public`.

### Composer no Windows

- **Instalar globalmente (recomendado):** descarregue o instalador em [getcomposer.org/download](https://getcomposer.org/download/) e marque a opção para adicionar `composer` ao PATH. Reinicie o terminal.
- **Só neste projeto:** na raiz do repo deve existir `composer.phar`. Use na pasta do projeto: `.\composer.bat install` (o script usa o PHP em `C:\xampp\php\php.exe` se existir; edite `composer.bat` se o teu PHP estiver outro sítio).
- **Erro SSL (`curl error 60` / `certificate verify failed`) no Composer Setup ou no PHP:** comum com XAMPP + antivírus (inspeção HTTPS). Tenta: (1) desativar temporariamente a inspeção HTTPS no Avast ou exceção para `php.exe`; (2) `cacert.pem` atual em `C:\xampp\php\extras\ssl\cacert.pem` e `curl.cainfo` / `openssl.cafile` no `php.ini` ([getcomposer.org/local-issuer](https://getcomposer.org/local-issuer)).
- **Instalar Composer sem HTTPS no PHP:** o instalador oficial aceita `--disable-tls` (usa HTTP só para obter o `composer.phar`). Descarrega `https://getcomposer.org/installer` com o **PowerShell** ou browser, depois: `php composer-setup.php --disable-tls --install-dir=... --filename=composer.phar`. No repo existe o script `scripts/instalar-composer-disable-tls.ps1` que automatiza isto.
- **ext-mongodb (XAMPP):** a biblioteca `mongodb/mongodb` 2.x exige **ext-mongodb ^2.2** (alinhado com o Railway / imagens atuais). Descarrega o ZIP em [windows.php.net → pecl → mongodb](https://windows.php.net/downloads/pecl/releases/mongodb/) com a mesma versão major da extensão (ex.: **2.2.x**), **PHP 8.2**, **x64**, **TS** se `php -i` mostrar *ZTS*; coloca `php_mongodb.dll` em `C:\xampp\php\ext\` e `extension=php_mongodb.dll` no `php.ini`. Se tiveres uma DLL antiga (1.21.x), substitui pela 2.2.x. Alternativa só para instalar pacotes sem driver: `.\composer.bat install --ignore-platform-req=ext-mongodb`.

### Exemplo de variáveis no `.env`

`MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/nome_da_base?appName=united-flow`

`MONGODB_DATABASE=nome_da_base` (opcional se o nome já estiver na URI)

Obs.: JWT próprio no backend; o banco é MongoDB com coleções criadas em tempo de execução (`users`, `clients`, `tasks`, `invoices`, `counters`).

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
- `database/migrations/001_init.sql` referência legada (Postgres); o runtime usa MongoDB.

## Deploy no Railway (Railpack)

O Railpack **não oferece PHP 8.1** — use `composer.json` com `"php": "^8.2"` ou superior.

No painel do serviço Railway, defina a variável de ambiente:

- `RAILPACK_PHP_ROOT_DIR=/app/public`

Isso aponta o document root para a pasta `public/` (onde está o `index.php`). Sem isso, o servidor pode não achar o front controller.

Configure também `APP_KEY`, `JWT_TTL`, `MONGODB_URI` e, se precisar, `MONGODB_DATABASE` nas variáveis do Railway.

### "Application failed to respond" no Railway

O health check costuma bater em `/` ou `/api/health`. O bootstrap precisa de `MONGODB_URI` válida; sem isso o serviço não sobe. `GET /api/health` inclui o campo `mongodb` (`connected` ou `unavailable`).
