# Instala composer.phar sem depender do HTTPS do PHP (usa TLS do Windows/PowerShell).
# Execute no PowerShell:  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force
#                          .\scripts\instalar-composer-sem-php-ssl.ps1

$ErrorActionPreference = "Stop"
$composerDir = Join-Path $env:LOCALAPPDATA "Composer"
$pharPath = Join-Path $composerDir "composer.phar"
$batPath = Join-Path $composerDir "composer.bat"

New-Item -ItemType Directory -Force -Path $composerDir | Out-Null

Write-Host "A descarregar Composer de getcomposer.org ..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri "https://getcomposer.org/download/latest-stable/composer.phar" -OutFile $pharPath -UseBasicParsing

$php = "C:\xampp\php\php.exe"
if (-not (Test-Path $php)) { $php = "php" }

@"
@echo off
"$php" "$pharPath" %*
"@ | Set-Content -Path $batPath -Encoding ASCII

Write-Host ""
Write-Host "Composer instalado em:"
Write-Host "  $pharPath"
Write-Host "  $batPath"
Write-Host ""
Write-Host "Adicione esta pasta ao PATH do utilizador:"
Write-Host "  $composerDir"
Write-Host ""
Write-Host "Definicoes > Conta > Opções avançadas do sistema > Variáveis de ambiente"
Write-Host "  > Path (Utilizador) > Editar > Novo > colar o caminho acima."
Write-Host ""
Write-Host "Feche e reabra o terminal e execute: composer -V"
