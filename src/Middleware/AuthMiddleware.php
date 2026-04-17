<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Core\Env;
use App\Core\JWT;
use App\Core\Request;
use App\Core\Response;
use App\Repositories\UserRepository;
use Exception;

final class AuthMiddleware
{
    /**
     * Cache em memória por processo para reduzir validações repetidas do mesmo token.
     *
     * @var array<string, array{exp:int, user:array}>
     */
    private static array $tokenCache = [];

    public function __construct(private readonly UserRepository $users)
    {
    }

    public function __invoke(Request $request): array
    {
        $authorization =
            $request->header('Authorization') ??
            (is_string($_SERVER['HTTP_AUTHORIZATION'] ?? null) ? (string) $_SERVER['HTTP_AUTHORIZATION'] : null) ??
            (is_string($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? null) ? (string) $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] : null);

        if (is_string($authorization)) {
            $authorization = trim($authorization);
        }
        if (!$authorization || !str_starts_with($authorization, 'Bearer ')) {
            Response::json(['error' => 'unauthorized', 'message' => 'Token ausente'], 401);
        }

        $token = trim(substr($authorization, 7));
        $secret = Env::get('APP_KEY', '');
        if ($secret === '') {
            Response::json(['error' => 'server_error', 'message' => 'APP_KEY não configurada'], 500);
        }

        try {
            $payload = JWT::decode($token, $secret);
        } catch (Exception $e) {
            Response::json(['error' => 'unauthorized', 'message' => $e->getMessage()], 401);
        }

        $cacheKey = hash('sha256', $token);
        $now = time();
        $cached = self::$tokenCache[$cacheKey] ?? null;
        if (is_array($cached) && (int) ($cached['exp'] ?? 0) > $now) {
            return ['user' => $cached['user']];
        }

        $lookupUserDb = filter_var((string) (Env::get('AUTH_LOOKUP_USER_DB', 'false') ?? 'false'), FILTER_VALIDATE_BOOLEAN);
        $userId = (int) ($payload['sub'] ?? 0);
        if (!$lookupUserDb) {
            $user = [
                'id' => $userId,
                'name' => (string) ($payload['name'] ?? ''),
                'email' => (string) ($payload['email'] ?? ''),
                'role' => (string) ($payload['role'] ?? ''),
                'organization_id' => (int) ($payload['org'] ?? 0),
            ];
            self::saveCacheEntry($cacheKey, (int) ($payload['exp'] ?? ($now + 60)), $user);
            return ['user' => $user];
        }

        $user = $this->users->findById($userId);
        if (!$user) {
            Response::json(['error' => 'unauthorized', 'message' => 'Usuário inválido'], 401);
        }

        self::saveCacheEntry($cacheKey, (int) ($payload['exp'] ?? ($now + 60)), $user);

        return ['user' => $user];
    }

    private static function saveCacheEntry(string $cacheKey, int $exp, array $user): void
    {
        // Limita crescimento em processos long-lived (php -S no Railway).
        if (count(self::$tokenCache) > 256) {
            array_shift(self::$tokenCache);
        }
        self::$tokenCache[$cacheKey] = [
            'exp' => $exp,
            'user' => $user,
        ];
    }
}
