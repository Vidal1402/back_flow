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
        private readonly Sequence $sequence
    )
    {
    }

    public function allByOrganization(int $organizationId): array
    {
        $cursor = $this->db->selectCollection('tasks')->find(
            ['organization_id' => $organizationId],
            ['sort' => ['id' => -1]]
        );

        $rows = [];
        $ownerIds = [];
        foreach ($cursor as $doc) {
            $row = $doc->getArrayCopy();
            $rows[] = $row;
            $ownerId = (int) ($row['owner_id'] ?? 0);
            if ($ownerId > 0) {
                $ownerIds[] = $ownerId;
            }
        }

        $ownerNamesById = [];
        if ($ownerIds !== []) {
            $usersCursor = $this->db->selectCollection('users')->find(
                ['id' => ['$in' => array_values(array_unique($ownerIds))]],
                ['projection' => ['id' => 1, 'name' => 1]]
            );
            foreach ($usersCursor as $doc) {
                $user = $doc->getArrayCopy();
                $ownerNamesById[(int) ($user['id'] ?? 0)] = (string) ($user['name'] ?? '');
            }
        }

        $items = [];
        foreach ($rows as $row) {
            $ownerId = (int) ($row['owner_id'] ?? 0);
            $items[] = [
                'id' => (int) ($row['id'] ?? 0),
                'title' => (string) ($row['title'] ?? ''),
                'type' => (string) ($row['type'] ?? 'Outros'),
                'priority' => (string) ($row['priority'] ?? 'Média'),
                'due_date' => $row['due_date'] ?? null,
                'status' => (string) ($row['status'] ?? 'solicitacoes'),
                'owner_id' => $ownerId,
                'owner_name' => $ownerNamesById[$ownerId] ?? null,
                'created_at' => BsonUtil::formatDate($row['created_at'] ?? null),
                'updated_at' => BsonUtil::formatDate($row['updated_at'] ?? null),
            ];
        }

        return $items;
    }

    public function create(array $payload, int $organizationId, int $ownerId): int
    {
        $id = $this->sequence->next('tasks');
        $now = new UTCDateTime();
        $this->db->selectCollection('tasks')->insertOne([
            'id' => $id,
            'title' => (string) $payload['title'],
            'type' => (string) ($payload['type'] ?? 'Outros'),
            'priority' => (string) ($payload['priority'] ?? 'Média'),
            'due_date' => $payload['due_date'] ?? null,
            'status' => (string) ($payload['status'] ?? 'solicitacoes'),
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
            ['id' => $taskId, 'organization_id' => $organizationId],
            ['$set' => ['status' => $status, 'updated_at' => new UTCDateTime()]]
        );

        return $result->getMatchedCount() > 0;
    }
}
