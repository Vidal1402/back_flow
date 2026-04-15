<?php

declare(strict_types=1);

namespace App\Repositories;

use PDO;

final class InvoiceRepository
{
    public function __construct(private readonly PDO $pdo)
    {
    }

    public function allByOrganization(int $organizationId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT id, invoice_code, period, amount, due_date, status, method, paid_at, created_at
             FROM invoices
             WHERE organization_id = :org
             ORDER BY id DESC'
        );
        $stmt->execute(['org' => $organizationId]);
        return $stmt->fetchAll() ?: [];
    }

    public function create(array $payload, int $organizationId): int
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO invoices (invoice_code, period, amount, due_date, status, method, organization_id)
             VALUES (:invoice_code, :period, :amount, :due_date, :status, :method, :organization_id)'
        );
        $stmt->execute([
            'invoice_code' => $payload['invoice_code'],
            'period' => $payload['period'],
            'amount' => $payload['amount'],
            'due_date' => $payload['due_date'],
            'status' => $payload['status'] ?? 'Pendente',
            'method' => $payload['method'] ?? 'Pix',
            'organization_id' => $organizationId,
        ]);

        return (int) $this->pdo->lastInsertId();
    }
}
