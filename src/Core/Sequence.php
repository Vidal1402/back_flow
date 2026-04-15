<?php

declare(strict_types=1);

namespace App\Core;

use MongoDB\Database as MongoDatabase;
use MongoDB\Operation\FindOneAndUpdate;

final class Sequence
{
    public function __construct(private readonly MongoDatabase $db)
    {
    }

    public function next(string $counterName): int
    {
        $counters = $this->db->selectCollection('counters');
        $doc = $counters->findOneAndUpdate(
            ['_id' => $counterName],
            ['$inc' => ['seq' => 1]],
            [
                'upsert' => true,
                'returnDocument' => FindOneAndUpdate::RETURN_DOCUMENT_AFTER,
            ]
        );

        return (int) ($doc['seq'] ?? 0);
    }
}
