<?php

declare(strict_types=1);

namespace App\Core;

use MongoDB\Client;
use MongoDB\Database as MongoDatabase;

final class MongoConnection
{
    private static ?MongoDatabase $db = null;

    /**
     * Atlas / drivers costumam funcionar melhor com retryWrites + majority no query string.
     */
    private static function normalizeUri(string $uri): string
    {
        $uri = trim($uri);
        if ($uri === '') {
            return $uri;
        }
        if (stripos($uri, 'retrywrites=') !== false) {
            return $uri;
        }
        $sep = str_contains($uri, '?') ? '&' : '?';

        return $uri . $sep . 'retryWrites=true&w=majority';
    }

    public static function database(): MongoDatabase
    {
        if (self::$db !== null) {
            return self::$db;
        }

        if (!class_exists(Client::class)) {
            Response::json([
                'error' => 'server_error',
                'message' => 'Biblioteca mongodb/mongodb não instalada. Rode composer install.',
            ], 500);
        }

        $rawUri = trim((string) (Env::get('MONGODB_URI') ?? Env::get('MONGO_URL') ?? ''));
        if ($rawUri === '') {
            Response::json([
                'error' => 'db_config_error',
                'message' => 'MONGODB_URI não configurado no ambiente.',
            ], 500);
        }

        $uri = self::normalizeUri($rawUri);

        $dbName = trim((string) (Env::get('MONGODB_DATABASE') ?? ''));
        if ($dbName === '') {
            $parsed = parse_url($rawUri, PHP_URL_PATH);
            $parsed = is_string($parsed) ? trim($parsed, '/') : '';
            $dbName = $parsed !== '' ? $parsed : 'united_flow';
        }

        try {
            $client = new Client($uri);
            self::$db = $client->selectDatabase($dbName);
            // Força conexão real; falhas de IP rede / auth aparecem aqui com mensagem clara.
            self::$db->command(['ping' => 1]);
        } catch (\Throwable $e) {
            $hint = '';
            $msg = $e->getMessage();
            if (stripos($msg, 'No suitable servers') !== false || stripos($msg, 'connection') !== false) {
                $hint = ' Verifique no MongoDB Atlas → Network Access se o IP do Railway está liberado (ex.: 0.0.0.0/0 para testes).';
            }
            Response::json([
                'error' => 'db_connection_error',
                'message' => $msg . $hint,
            ], 500);
        }

        return self::$db;
    }
}
