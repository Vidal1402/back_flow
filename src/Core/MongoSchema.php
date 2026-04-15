<?php

declare(strict_types=1);

namespace App\Core;

use MongoDB\Database as MongoDatabase;

final class MongoSchema
{
    public static function ensureIndexes(MongoDatabase $db): void
    {
        $db->selectCollection('users')->createIndex(['email' => 1], ['unique' => true]);
        $db->selectCollection('clients')->createIndex(['organization_id' => 1]);
        $db->selectCollection('tasks')->createIndex(['organization_id' => 1]);
        $db->selectCollection('tasks')->createIndex(['owner_id' => 1]);
        $db->selectCollection('invoices')->createIndex(['organization_id' => 1]);
        $db->selectCollection('invoices')->createIndex(['invoice_code' => 1], ['unique' => true]);
    }
}
