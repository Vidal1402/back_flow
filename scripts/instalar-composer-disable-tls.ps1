# Instala o Composer quando o PHP falha em HTTPS (erro "certificate verify failed").
# Passo 1: PowerShell descarrega o instalador (TLS do Windows).
# Passo 2: php composer-setup.php --disable-tls (o instalador usa HTTP para obter o .phar).
#
#   cd C:\Downloads\back_united_flow
#   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force
#   .\scripts\instalar-composer-disable-tls.ps1

$ErrorActionPreference = "Stop"
$php = "C:\xampp\php\php.exe"
if (-not (Test-Path $php)) {
    Write-Host "Edite o script e defina o caminho correto para php.exe" -ForegroundColor Red
    exit 1
}

$target = Join-Path $env:LOCALAPPDATA "Composer"
New-Item -ItemType Directory -Force -Path $target | Out-Null
$setup = Join-Path $target "composer-setup.php"

Write-Host "A descarregar composer-setup.php ..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri "https://getcomposer.org/installer" -OutFile $setup -UseBasicParsing

Write-Host "A instalar composer.phar com --disable-tls ..."
Write-Host "(HTTP apenas neste passo; depois corrija antivirus/cacert para composer install usar HTTPS.)" -ForegroundColor Yellow

& $php $setup --disable-tls --install-dir=$target --filename=composer.phar
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$bat = Join-Path $target "composer.bat"
@"
@echo off
"$php" "$target\composer.phar" %*
"@ | Set-Content -Path $bat -Encoding ASCII

Write-Host ""
Write-Host "Composer: $target\composer.phar" -ForegroundColor Green
Write-Host "Adicione ao PATH do utilizador: $target"
Write-Host "Feche o terminal, abra outro e teste: composer -V"
Remove-Item $setup -ErrorAction SilentlyContinue
