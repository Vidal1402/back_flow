<?php

declare(strict_types=1);

/**
 * Entrada na raiz do repositório.
 * O Railpack/FrankenPHP costuma usar /app como document root em apps PHP que não são Laravel;
 * sem este arquivo, só existe public/index.php e o servidor pode não responder a nenhuma rota.
 */
require __DIR__ . '/public/index.php';
