<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\BsonUtil;
use MongoDB\Database as MongoDatabase;

final class InvoiceRepository
{
    public function __construct(private readonly MongoDatabase $db)
    {
    }

    public function allByOrganization(int $organizationId): array
    {
        $cursor = $this->db->selectCollection('invoices')->find(
            ['organization_id' => $organizationId],
            ['sort' => ['_id' => -1]]
        );

        $rows = [];
        foreach ($cursor as $doc) {
            $rows[] = $this->toInvoiceRow($this->normalizeAssoc($doc));
        }

        return $rows;
    }

    /**
     * @param array<string, mixed> $doc
     * @return array<string, mixed>
     */
    private function toInvoiceRow(array $doc): array
    {
        $paidAt = $doc['paid_at'] ?? null;

        return [
            'id' => (int) $doc['_id'],
            'invoice_code' => (string) $doc['invoice_code'],
            'period' => (string) $doc['period'],
            'amount' => (float) $doc['amount'],
            'due_date' => (string) $doc['due_date'],
            'status' => (string) $doc['status'],
            'method' => (string) $doc['method'],
            'paid_at' => $paidAt !== null ? (BsonUtil::formatDate($paidAt) ?? null) : null,
            'created_at' => BsonUtil::formatDate($doc['created_at'] ?? null) ?? '',
        ];
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
