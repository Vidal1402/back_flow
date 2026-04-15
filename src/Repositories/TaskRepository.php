<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\BsonUtil;
use App\Core\Sequence;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Database as MongoDatabase;

final class TaskRepository
{
    public function __construct(
        private readonly MongoDatabase $db,
        private readonly Sequence $sequence,
    ) {
    }

    public function allByOrganization(int $organizationId): array
    {
        $tasks = $this->db->selectCollection('tasks')->find(
            ['organization_id' => $organizationId],
            ['sort' => ['_id' => -1]]
        );

        $rows = [];
        $ownerIds = [];
        foreach ($tasks as $doc) {
            $row = $this->normalizeAssoc($doc);
            $rows[] = $row;
            if (!empty($row['owner_id'])) {
                $ownerIds[(int) $row['owner_id']] = true;
            }
        }

        $ownerNames = $this->loadOwnerNames(array_keys($ownerIds));

        $out = [];
        foreach ($rows as $row) {
            $oid = isset($row['owner_id']) ? (int) $row['owner_id'] : null;
            $out[] = [
                'id' => (int) $row['_id'],
                'title' => (string) $row['title'],
                'type' => (string) $row['type'],
                'priority' => (string) $row['priority'],
                'due_date' => $row['due_date'] !== null ? (string) $row['due_date'] : null,
                'status' => (string) $row['status'],
                'owner_id' => $oid,
                'owner_name' => $oid !== null ? ($ownerNames[$oid] ?? null) : null,
                'created_at' => BsonUtil::formatDate($row['created_at'] ?? null) ?? '',
                'updated_at' => BsonUtil::formatDate($row['updated_at'] ?? null) ?? '',
            ];
        }

        return $out;
    }

    /**
     * @param list<int> $ownerIds
     * @return array<int, string>
     */
    private function loadOwnerNames(array $ownerIds): array
    {
        if ($ownerIds === []) {
            return [];
        }

        $cursor = $this->db->selectCollection('users')->find(
            ['_id' => ['$in' => $ownerIds]],
            ['projection' => ['name' => 1]]
        );

        $names = [];
        foreach ($cursor as $doc) {
            $doc = $this->normalizeAssoc($doc);
            $names[(int) $doc['_id']] = (string) ($doc['name'] ?? '');
        }

        return $names;
    }

    public function create(array $payload, int $organizationId, int $ownerId): int
    {
        $id = $this->sequence->next('tasks');
        $now = new UTCDateTime();

        $this->db->selectCollection('tasks')->insertOne([
            '_id' => $id,
            'title' => $payload['title'],
            'type' => $payload['type'] ?? 'Outros',
            'priority' => $payload['priority'] ?? 'Média',
            'due_date' => $payload['due_date'] ?? null,
            'status' => $payload['status'] ?? 'solicitacoes',
            'owner_id' => (int) ($payload['owner_id'] ?? $ownerId),
            'organization_id' => $organizationId,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        return $id;
    }

    public function updateStatus(int $taskId, string $status, int $organizationId): bool
    {
        $result = $this->db->selectCollection('tasks')->updateOne(
            [
                '_id' => $taskId,
                'organization_id' => $organizationId,
            ],
            [
                '$set' => [
                    'status' => $status,
                    'updated_at' => new UTCDateTime(),
                ],
            ]
        );

        return $result->getMatchedCount() > 0;
    }

    /**
     * @param iterable<mixed, mixed> $doc
     * @return array<string, mixed>
     */
    private function normalizeAssoc(iterable $doc): array
    {
        $out = [];
        foreach ($doc as $k => $v) {
            $out[(string) $k] = $v;
        }

        return $out;
    }
}
