<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\BsonUtil;
use App\Core\Sequence;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Database as MongoDatabase;

final class UserRepository
{
    public function __construct(
        private readonly MongoDatabase $db,
        private readonly Sequence $sequence
    )
    {
    }

    public function findByEmail(string $email): ?array
    {
        $normalizedEmail = mb_strtolower(trim($email));
        $doc = $this->db->selectCollection('users')->findOne(['email' => $normalizedEmail]);
        return $doc ? $this->mapUser($doc->getArrayCopy(), true) : null;
    }

    public function findById(int $id): ?array
    {
        $doc = $this->db->selectCollection('users')->findOne(['id' => $id]);
        return $doc ? $this->mapUser($doc->getArrayCopy(), false) : null;
    }

    public function create(string $name, string $email, string $passwordHash, string $role = 'colaborador', int $organizationId = 1): int
    {
        $id = $this->sequence->next('users');
        $now = new UTCDateTime();
        $this->db->selectCollection('users')->insertOne([
            'id' => $id,
            'name' => $name,
            'email' => mb_strtolower(trim($email)),
            'password_hash' => $passwordHash,
            'role' => $role,
            'organization_id' => $organizationId,
            'created_at' => $now,
            'updated_at' => $now,
        ]);
        return $id;
    }

    private function mapUser(array $doc, bool $withPassword): array
    {
        $mapped = [
            'id' => (int) ($doc['id'] ?? 0),
            'name' => (string) ($doc['name'] ?? ''),
            'email' => (string) ($doc['email'] ?? ''),
            'role' => (string) ($doc['role'] ?? 'colaborador'),
            'organization_id' => (int) ($doc['organization_id'] ?? 1),
            'created_at' => BsonUtil::formatDate($doc['created_at'] ?? null),
        ];

        if ($withPassword) {
            $mapped['password_hash'] = (string) ($doc['password_hash'] ?? '');
        }

        return $mapped;
    }
}
