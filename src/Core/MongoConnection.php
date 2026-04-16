<?php

declare(strict_types=1);

namespace App\Core;

use MongoDB\Client;
use MongoDB\Database as MongoDatabase;

final class MongoConnection
{
    private static ?MongoDatabase $db = null;

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

        $uri = trim((string) (Env::get('MONGODB_URI') ?? Env::get('MONGO_URL') ?? ''));
        if ($uri === '') {
            Response::json([
                'error' => 'db_config_error',
                'message' => 'MONGODB_URI não configurado no ambiente.',
            ], 500);
        }

        $dbName = trim((string) (Env::get('MONGODB_DATABASE') ?? ''));
        if ($dbName === '') {
            $parsed = parse_url($uri, PHP_URL_PATH);
            $parsed = is_string($parsed) ? trim($parsed, '/') : '';
            $dbName = $parsed !== '' ? $parsed : 'united_flow';
        }

        try {
            $client = new Client($uri);
            self::$db = $client->selectDatabase($dbName);
        } catch (\Throwable $e) {
            Response::json([
                'error' => 'db_connection_error',
                'message' => $e->getMessage(),
            ], 500);
        }

        return self::$db;
    }
}
