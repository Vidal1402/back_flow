<?php

declare(strict_types=1);

namespace App\Core;

final class Response
{
    /**
     * Cabeçalhos CORS. Use CORS_ORIGINS (lista separada por vírgula) em produção;
     * se vazio, permite qualquer origem com * (adequado a JWT no header, sem cookies).
     */
    public static function applyCors(): void
    {
        $raw = Env::get('CORS_ORIGINS', '');
        $allowed = array_values(array_filter(array_map('trim', explode(',', $raw))));
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if ($allowed === []) {
            header('Access-Control-Allow-Origin: *');
        } elseif ($origin !== '' && in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
        }

        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Max-Age: 86400');
    }

    public static function json(array $data, int $status = 200): void
    {
        http_response_code($status);
        self::applyCors();
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}
