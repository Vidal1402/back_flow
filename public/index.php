<?php

declare(strict_types=1);

use App\Core\Request;
use App\Core\Response;

$vendorAutoload = __DIR__ . '/../vendor/autoload.php';
if (is_file($vendorAutoload)) {
    require_once $vendorAutoload;
} else {
    spl_autoload_register(static function (string $class): void {
        $prefix = 'App\\';
        if (!str_starts_with($class, $prefix)) {
            return;
        }
        $relative = substr($class, strlen($prefix));
        $path = __DIR__ . '/../src/' . str_replace('\\', '/', $relative) . '.php';
        if (is_file($path)) {
            require_once $path;
        }
    });
}

$request = Request::capture();
$path = rtrim($request->path, '/') ?: '/';

// Health leve sem bootstrap (probes na raiz). /api/health usa HealthController + MongoDB.
if ($request->method === 'GET' && in_array($path, ['/', '/health'], true)) {
    Response::json([
        'status' => 'ok',
        'service' => 'php-mvp-api',
        'timestamp' => date(DATE_ATOM),
    ]);
}

$router = require __DIR__ . '/../src/bootstrap.php';
$router->dispatch($request);
