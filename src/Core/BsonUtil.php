<?php

declare(strict_types=1);

namespace App\Core;

use MongoDB\BSON\UTCDateTime;

final class BsonUtil
{
    public static function formatDate(mixed $value): ?string
    {
        if ($value instanceof UTCDateTime) {
            return $value->toDateTime()->format(DATE_ATOM);
        }

        if (is_string($value)) {
            return $value;
        }

        return null;
    }
}
