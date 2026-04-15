@echo off
setlocal
set "PHP=C:\xampp\php\php.exe"
if not exist "%PHP%" set "PHP=php"

set "ROOT=%~dp0"
set "PHAR=%ROOT%composer.phar"
if not exist "%PHAR%" set "PHAR=%LOCALAPPDATA%\Composer\composer.phar"

if not exist "%PHAR%" (
    echo Composer nao encontrado. Instale com scripts\instalar-composer-disable-tls.ps1
    echo ou coloque composer.phar na pasta: %ROOT%
    exit /1
)

set "CA=%ROOT%cacert.pem"
if exist "%CA%" (
  "%PHP%" -d openssl.cafile="%CA%" -d curl.cainfo="%CA%" "%PHAR%" %*
) else (
  "%PHP%" "%PHAR%" %*
)
