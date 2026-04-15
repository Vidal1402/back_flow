<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Repositories\InvoiceRepository;

final class InvoiceController
{
    public function __construct(private readonly InvoiceRepository $invoices)
    {
    }

    public function index(array $context): void
    {
        $org = (int) $context['user']['organization_id'];
        $items = $this->invoices->allByOrganization($org);
        Response::json(['data' => $items]);
    }

    public function store(Request $request, array $context): void
    {
        $payload = $request->body;
        if (empty($payload['period']) || empty($payload['due_date']) || empty($payload['amount'])) {
            Response::json([
                'error' => 'validation_error',
                'message' => 'period, amount e due_date são obrigatórios',
            ], 422);
        }

        $org = (int) $context['user']['organization_id'];
        $invoiceCode = trim((string) ($payload['invoice_code'] ?? ''));
        if ($invoiceCode === '') {
            $invoiceCode = 'INV-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));
        }

        $id = $this->invoices->create([
            'invoice_code' => $invoiceCode,
            'period' => (string) $payload['period'],
            'amount' => (float) $payload['amount'],
            'due_date' => (string) $payload['due_date'],
            'status' => (string) ($payload['status'] ?? 'Pendente'),
            'method' => (string) ($payload['method'] ?? 'Pix'),
        ], $org);

        Response::json([
            'message' => 'Fatura criada',
            'id' => $id,
            'invoice_code' => $invoiceCode,
        ], 201);
    }
}
