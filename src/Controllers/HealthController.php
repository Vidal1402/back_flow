<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Database;
use App\Core\Request;
use App\Core\Response;
use Throwable;

final class HealthController
{
    public function __invoke(Request $request): void
    {
        $mongoOk = false;
        try {
            Database::database()->command(['ping' => 1]);
            $mongoOk = true;
        } catch (Throwable) {
            $mongoOk = false;
        }

        $status = $mongoOk ? 'ok' : 'degraded';

        Response::json([
            'status' => $status,
            'service' => 'php-mvp-api',
            'mongodb' => $mongoOk ? 'connected' : 'unavailable',
            'timestamp' => date(DATE_ATOM),
        ]);
    }
}
