<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\BsonUtil;
use App\Core\Sequence;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Database as MongoDatabase;

final class ClientRepository
{
    public function __construct(
        private readonly MongoDatabase $db,
        private readonly Sequence $sequence,
    ) {
    }

    public function allByOrganization(int $organizationId): array
    {
        $cursor = $this->db->selectCollection('clients')->find(
            ['organization_id' => $organizationId],
            ['sort' => ['_id' => -1]]
        );

        $rows = [];
        foreach ($cursor as $doc) {
            $rows[] = $this->toClientRow($this->normalizeAssoc($doc));
        }

        return $rows;
    }

    public function create(array $payload, int $organizationId): int
    {
        $id = $this->sequence->next('clients');
        $now = new UTCDateTime();

        $this->db->selectCollection('clients')->insertOne([
            '_id' => $id,
            'name' => $payload['name'],
            'empresa' => $payload['empresa'],
            'email' => $payload['email'],
            'telefone' => $payload['telefone'] ?? null,
            'plano' => $payload['plano'] ?? 'Growth',
            'valor' => (float) ($payload['valor'] ?? 0),
            'status' => $payload['status'] ?? 'ativo',
            'organization_id' => $organizationId,
            'created_at' => $now,
        ]);

        return $id;
    }

    /**
     * @param array<string, mixed> $doc
     * @return array<string, mixed>
     */
    private function toClientRow(array $doc): array
    {
        return [
            'id' => (int) $doc['_id'],
            'name' => (string) $doc['name'],
            'empresa' => (string) $doc['empresa'],
            'email' => (string) $doc['email'],
            'telefone' => $doc['telefone'] !== null ? (string) $doc['telefone'] : null,
            'plano' => (string) $doc['plano'],
            'valor' => (float) $doc['valor'],
            'status' => (string) $doc['status'],
            'organization_id' => (int) $doc['organization_id'],
            'created_at' => BsonUtil::formatDate($doc['created_at'] ?? null) ?? '',
        ];
    }

    /**
     * @param array<string, mixed> $doc
     * @return array<string, mixed>
     */
    private function normalizeAssoc(array $doc): array
    {
        $out = [];
        foreach ($doc as $k => $v) {
            $out[(string) $k] = $v;
        }

        return $out;
    }
}
