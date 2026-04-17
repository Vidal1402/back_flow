<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\BsonUtil;
use App\Core\Sequence;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Database as MongoDatabase;
use MongoDB\Model\BSONArray;
use MongoDB\Model\BSONDocument;
use MongoDB\Operation\FindOneAndUpdate;

final class MarketingMetricRepository
{
    public function __construct(
        private readonly MongoDatabase $db,
        private readonly Sequence $sequence
    ) {
    }

    public function allByOrganization(int $organizationId, ?int $clientId = null, ?string $period = null, int $limit = 100): array
    {
        $safeLimit = max(1, min($limit, 500));
        $filter = ['organization_id' => $organizationId];
        if ($clientId !== null && $clientId > 0) {
            $filter['client_id'] = $clientId;
        }
        $periodNorm = $this->normalizePeriodLabel($period ?? '');
        if ($periodNorm !== '') {
            $filter['period_label_norm'] = $periodNorm;
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
        $periodLabel = $this->extractPeriodLabel($payload);
        $periodNorm = $this->normalizePeriodLabel($periodLabel);

        $this->db->selectCollection('marketing_metrics')->insertOne([
            'id' => $id,
            'organization_id' => $organizationId,
            'client_id' => $clientId,
            'payload' => $payload,
            'period_label_norm' => $periodNorm,
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
    public function upsertForClientAndPeriod(int $organizationId, int $clientId, array $payload): array
    {
        $now = new UTCDateTime();
        $candidateId = $this->sequence->next('marketing_metrics');
        $periodLabel = $this->extractPeriodLabel($payload);
        $periodNorm = $this->normalizePeriodLabel($periodLabel);
        if ($periodNorm === '') {
            $periodNorm = 'sem_periodo';
        }
        $doc = $this->db->selectCollection('marketing_metrics')->findOneAndUpdate(
            ['organization_id' => $organizationId, 'client_id' => $clientId, 'period_label_norm' => $periodNorm],
            [
                '$set' => [
                    'payload' => $payload,
                    'period_label_norm' => $periodNorm,
                    'updated_at' => $now,
                ],
                '$setOnInsert' => [
                    'id' => $candidateId,
                    'organization_id' => $organizationId,
                    'client_id' => $clientId,
                    'period_label_norm' => $periodNorm,
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
        $payload = $this->toPlainArray($row['payload'] ?? []);
        $normalized = $this->normalizePayload($payload);
        $base = [
            'id' => (int) ($row['id'] ?? 0),
            'organization_id' => (int) ($row['organization_id'] ?? 0),
            'client_id' => (int) ($row['client_id'] ?? 0),
            'period_label' => (string) ($normalized['period_label'] ?? ''),
            'has_channel_metrics' => (bool) ($normalized['has_channel_metrics'] ?? false),
            'created_at' => BsonUtil::formatDate($row['created_at'] ?? null),
            'updated_at' => BsonUtil::formatDate($row['updated_at'] ?? null),
        ];

        // Compatibilidade: alguns frontends antigos esperam métricas no nível raiz.
        foreach ($normalized['payload'] as $key => $value) {
            if (is_string($key) && !array_key_exists($key, $base)) {
                $base[$key] = $value;
            }
        }

        // Mantém também o payload bruto para consumidores novos.
        $base['payload'] = $normalized['payload'];
        $base['channels'] = $normalized['channels'];

        return $base;
    }

    /**
     * @param array<string, mixed> $payload
     * @return array{payload:array<string,mixed>, period_label:string, channels:array<int,array<string,mixed>>, has_channel_metrics:bool}
     */
    private function normalizePayload(array $payload): array
    {
        $flat = [];
        $this->flattenValues($payload, $flat);

        $periodLabel = $this->readStringByAliases($flat, [
            'period_label', 'period', 'periodo', 'periodo_label', 'month_label', 'mes_referencia', 'reference_month',
        ]) ?? '';

        $metaSpend = $this->readNumberByAliases($flat, ['meta_spend', 'facebook_spend', 'meta_investment', 'investment_meta', 'meta_amount', 'meta_budget']);
        $metaLeads = $this->readNumberByAliases($flat, ['meta_leads', 'facebook_leads', 'lead_count_meta', 'meta_lead_count']);
        $metaConversions = $this->readNumberByAliases($flat, ['meta_conversions', 'meta_conversion_count', 'meta_results', 'meta_resultado']);

        $googleSpend = $this->readNumberByAliases($flat, ['google_spend', 'google_ads_spend', 'google_investment', 'investment_google', 'google_amount', 'google_budget']);
        $googleLeads = $this->readNumberByAliases($flat, ['google_leads', 'lead_count_google', 'google_lead_count']);
        $googleConversions = $this->readNumberByAliases($flat, ['google_conversions', 'google_conversion_count', 'google_results', 'google_resultado']);

        $organicLeads = $this->readNumberByAliases($flat, ['organic_leads', 'organico_leads', 'seo_leads']);
        $organicConversions = $this->readNumberByAliases($flat, ['organic_conversions', 'organico_conversions', 'seo_conversions']);

        $otherSpend = $this->readNumberByAliases($flat, ['other_spend', 'outros_spend', 'others_spend', 'other_investment']);
        $otherLeads = $this->readNumberByAliases($flat, ['other_leads', 'outros_leads', 'others_leads']);
        $otherConversions = $this->readNumberByAliases($flat, ['other_conversions', 'outros_conversions', 'others_conversions']);

        $channels = [];
        $this->pushChannel($channels, 'meta', $metaSpend, $metaLeads, $metaConversions);
        $this->pushChannel($channels, 'google', $googleSpend, $googleLeads, $googleConversions);
        $this->pushChannel($channels, 'organico', null, $organicLeads, $organicConversions);
        $this->pushChannel($channels, 'outros', $otherSpend, $otherLeads, $otherConversions);

        $normalizedPayload = $payload;
        $this->injectNumber($normalizedPayload, 'meta_spend', $metaSpend);
        $this->injectNumber($normalizedPayload, 'meta_leads', $metaLeads);
        $this->injectNumber($normalizedPayload, 'meta_conversions', $metaConversions);
        $this->injectNumber($normalizedPayload, 'google_spend', $googleSpend);
        $this->injectNumber($normalizedPayload, 'google_leads', $googleLeads);
        $this->injectNumber($normalizedPayload, 'google_conversions', $googleConversions);
        $this->injectNumber($normalizedPayload, 'organic_leads', $organicLeads);
        $this->injectNumber($normalizedPayload, 'organic_conversions', $organicConversions);
        $this->injectNumber($normalizedPayload, 'other_spend', $otherSpend);
        $this->injectNumber($normalizedPayload, 'other_leads', $otherLeads);
        $this->injectNumber($normalizedPayload, 'other_conversions', $otherConversions);
        if ($periodLabel !== '' && !isset($normalizedPayload['period_label'])) {
            $normalizedPayload['period_label'] = $periodLabel;
        }

        return [
            'payload' => $normalizedPayload,
            'period_label' => $periodLabel,
            'channels' => $channels,
            'has_channel_metrics' => $channels !== [],
        ];
    }

    /**
     * @param array<string, mixed> $payload
     */
    private function injectNumber(array &$payload, string $key, ?float $value): void
    {
        if ($value === null) {
            return;
        }
        $payload[$key] = $value;
    }

    /**
     * @param array<int, array<string, mixed>> $channels
     */
    private function pushChannel(array &$channels, string $name, ?float $spend, ?float $leads, ?float $conversions): void
    {
        $hasValue = ($spend ?? 0) > 0 || ($leads ?? 0) > 0 || ($conversions ?? 0) > 0;
        if (!$hasValue) {
            return;
        }

        $channels[] = [
            'channel' => $name,
            'spend' => $spend ?? 0.0,
            'leads' => $leads ?? 0.0,
            'conversions' => $conversions ?? 0.0,
        ];
    }

    /**
     * @param array<string, mixed> $flat
     * @param array<int, string> $aliases
     */
    private function readStringByAliases(array $flat, array $aliases): ?string
    {
        foreach ($aliases as $alias) {
            $key = $this->normalizeKey($alias);
            if (!array_key_exists($key, $flat)) {
                continue;
            }
            $value = trim((string) $flat[$key]);
            if ($value !== '') {
                return $value;
            }
        }
        return null;
    }

    /**
     * @param array<string, mixed> $flat
     * @param array<int, string> $aliases
     */
    private function readNumberByAliases(array $flat, array $aliases): ?float
    {
        foreach ($aliases as $alias) {
            $key = $this->normalizeKey($alias);
            if (!array_key_exists($key, $flat)) {
                continue;
            }
            $number = $this->toNumber($flat[$key]);
            if ($number !== null) {
                return $number;
            }
        }
        return null;
    }

    /**
     * @param array<string, mixed> $source
     * @param array<string, mixed> $flat
     */
    private function flattenValues(array $source, array &$flat): void
    {
        foreach ($source as $key => $value) {
            if (!is_string($key) || $key === '') {
                continue;
            }
            $normalizedKey = $this->normalizeKey($key);
            $plain = $this->toPlainValue($value);
            if (is_array($plain)) {
                $this->flattenValues($plain, $flat);
                continue;
            }
            $flat[$normalizedKey] = $plain;
        }
    }

    private function normalizeKey(string $key): string
    {
        $key = mb_strtolower(trim($key));
        $key = preg_replace('/[^a-z0-9]+/', '_', $key);
        $key = is_string($key) ? trim($key, '_') : '';
        return $key;
    }

    private function toNumber(mixed $value): ?float
    {
        $plain = $this->toPlainValue($value);
        if (is_int($plain) || is_float($plain)) {
            return (float) $plain;
        }
        if (is_object($plain) && method_exists($plain, '__toString')) {
            $plain = (string) $plain;
        }
        if (!is_string($plain)) {
            return null;
        }

        $value = $plain;
        if (is_int($value) || is_float($value)) {
            return (float) $value;
        }
        if (!is_string($value)) {
            return null;
        }

        $v = trim($value);
        if ($v === '') {
            return null;
        }

        $v = str_replace(['R$', 'r$', ' '], '', $v);
        $hasComma = str_contains($v, ',');
        $hasDot = str_contains($v, '.');
        if ($hasComma && $hasDot) {
            $lastComma = strrpos($v, ',');
            $lastDot = strrpos($v, '.');
            if ($lastComma !== false && $lastDot !== false && $lastComma > $lastDot) {
                $v = str_replace('.', '', $v);
                $v = str_replace(',', '.', $v);
            } else {
                $v = str_replace(',', '', $v);
            }
        } elseif ($hasComma) {
            $v = str_replace(',', '.', $v);
        }

        $v = preg_replace('/[^0-9.\-]/', '', $v);
        if (!is_string($v) || $v === '' || $v === '-' || $v === '.') {
            return null;
        }

        return is_numeric($v) ? (float) $v : null;
    }

    /**
     * @param array<string, mixed> $payload
     */
    private function extractPeriodLabel(array $payload): string
    {
        $flat = [];
        $this->flattenValues($payload, $flat);
        return $this->readStringByAliases($flat, [
            'period_label', 'period', 'periodo', 'periodo_label', 'month_label', 'mes_referencia', 'reference_month',
        ]) ?? '';
    }

    private function normalizePeriodLabel(string $periodLabel): string
    {
        $v = mb_strtolower(trim($periodLabel));
        if ($v === '') {
            return '';
        }
        $v = preg_replace('/\s+/', '', $v);
        $v = is_string($v) ? $v : '';
        return $v;
    }

    /**
     * @return array<string, mixed>
     */
    private function toPlainArray(mixed $value): array
    {
        $plain = $this->toPlainValue($value);
        if (!is_array($plain)) {
            return [];
        }

        // Mantém assinatura array<string,mixed> para o restante do repositório.
        $out = [];
        foreach ($plain as $k => $v) {
            $out[(string) $k] = $v;
        }
        return $out;
    }

    private function toPlainValue(mixed $value): mixed
    {
        if ($value instanceof BSONDocument || $value instanceof BSONArray) {
            return $this->toPlainValue($value->getArrayCopy());
        }

        if (is_array($value)) {
            $out = [];
            foreach ($value as $k => $v) {
                $out[$k] = $this->toPlainValue($v);
            }
            return $out;
        }

        if (is_object($value) && method_exists($value, 'getArrayCopy')) {
            /** @var mixed $arr */
            $arr = $value->getArrayCopy();
            return $this->toPlainValue($arr);
        }

        return $value;
    }
}
