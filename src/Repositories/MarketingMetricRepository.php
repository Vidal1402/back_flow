<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\BsonUtil;
use App\Core\Sequence;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Database as MongoDatabase;
use MongoDB\Operation\FindOneAndUpdate;

final class MarketingMetricRepository
{
    public function __construct(
        private readonly MongoDatabase $db,
        private readonly Sequence $sequence
    ) {
    }

    public function allByOrganization(int $organizationId, ?int $clientId = null, int $limit = 100): array
    {
        $safeLimit = max(1, min($limit, 500));
        $filter = ['organization_id' => $organizationId];
        if ($clientId !== null && $clientId > 0) {
            $filter['client_id'] = $clientId;
        }

        $cursor = $this->db->selectCollection('marketing_metrics')->find(
            $filter,
            [
                'sort' => ['updated_at' => -1],
                'limit' => $safeLimit,
                'projection' => [
                    'id' => 1,
                    'organization_id' => 1,
                    'client_id' => 1,
                    'payload' => 1,
                    'created_at' => 1,
                    'updated_at' => 1,
                ],
            ]
        );

        $items = [];
        foreach ($cursor as $doc) {
            $items[] = $this->mapRow($doc->getArrayCopy());
        }

        return $items;
    }

    public function findByOrganizationAndId(int $organizationId, int $id): ?array
    {
        $doc = $this->db->selectCollection('marketing_metrics')->findOne([
            'organization_id' => $organizationId,
            'id' => $id,
        ]);
        if ($doc === null) {
            return null;
        }

        return $this->mapRow($doc->getArrayCopy());
    }

    /**
     * @param array<string, mixed> $payload
     */
    public function create(int $organizationId, int $clientId, array $payload): int
    {
        $id = $this->sequence->next('marketing_metrics');
        $now = new UTCDateTime();

        $this->db->selectCollection('marketing_metrics')->insertOne([
            'id' => $id,
            'organization_id' => $organizationId,
            'client_id' => $clientId,
            'payload' => $payload,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        return $id;
    }

    /**
     * @param array<string, mixed> $payload
     */
    public function updateForOrganization(int $organizationId, int $id, int $clientId, array $payload): bool
    {
        $result = $this->db->selectCollection('marketing_metrics')->updateOne(
            ['organization_id' => $organizationId, 'id' => $id],
            ['$set' => [
                'client_id' => $clientId,
                'payload' => $payload,
                'updated_at' => new UTCDateTime(),
            ]]
        );

        return $result->getMatchedCount() > 0;
    }

    /**
     * @param array<string, mixed> $payload
     */
    public function upsertLatestForClient(int $organizationId, int $clientId, array $payload): array
    {
        $now = new UTCDateTime();
        $candidateId = $this->sequence->next('marketing_metrics');
        $doc = $this->db->selectCollection('marketing_metrics')->findOneAndUpdate(
            ['organization_id' => $organizationId, 'client_id' => $clientId],
            [
                '$set' => [
                    'payload' => $payload,
                    'updated_at' => $now,
                ],
                '$setOnInsert' => [
                    'id' => $candidateId,
                    'organization_id' => $organizationId,
                    'client_id' => $clientId,
                    'created_at' => $now,
                ],
            ],
            [
                'upsert' => true,
                'returnDocument' => FindOneAndUpdate::RETURN_DOCUMENT_AFTER,
            ]
        );

        if ($doc === null) {
            return [];
        }

        return $this->mapRow($doc->getArrayCopy());
    }

    public function deleteForOrganization(int $organizationId, int $id): bool
    {
        $result = $this->db->selectCollection('marketing_metrics')->deleteOne([
            'organization_id' => $organizationId,
            'id' => $id,
        ]);

        return $result->getDeletedCount() > 0;
    }

    /**
     * @param array<string, mixed> $row
     * @return array<string, mixed>
     */
    private function mapRow(array $row): array
    {
        $payload = is_array($row['payload'] ?? null) ? $row['payload'] : [];
        $base = [
            'id' => (int) ($row['id'] ?? 0),
            'organization_id' => (int) ($row['organization_id'] ?? 0),
            'client_id' => (int) ($row['client_id'] ?? 0),
            'created_at' => BsonUtil::formatDate($row['created_at'] ?? null),
            'updated_at' => BsonUtil::formatDate($row['updated_at'] ?? null),
        ];

        // Compatibilidade: alguns frontends antigos esperam métricas no nível raiz.
        foreach ($payload as $key => $value) {
            if (is_string($key) && !array_key_exists($key, $base)) {
                $base[$key] = $value;
            }
        }

        // Mantém também o payload bruto para consumidores novos.
        $base['payload'] = $payload;

        return $base;
    }
}
