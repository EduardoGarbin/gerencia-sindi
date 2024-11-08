<?php

namespace App\Services;

use Exception;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthService
{
    public function login(array $credentials): array
    {
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return $this->errorResponse(Response::HTTP_UNAUTHORIZED, 'Credenciais inválidas');
            }

            return $this->successResponse($token);
        } catch (JWTException $e) {
            return $this->errorResponse(Response::HTTP_INTERNAL_SERVER_ERROR, 'Erro ao gerar o token JWT', $e->getMessage());
        } catch (Exception $e) {
            return $this->errorResponse(Response::HTTP_INTERNAL_SERVER_ERROR, 'Ocorreu um erro durante a autenticação', $e->getMessage());
        }
    }

    private function errorResponse(int $code, string $message, string $exceptionMessage = null): array
    {
        return [
            'status' => 'error',
            'message' => $message,
            'code' => $code,
            'exception' => $exceptionMessage,
            'data' => []
        ];
    }

    private function successResponse(string $token): array
    {
        return [
            'status' => 'success',
            'message' => 'Autenticado com sucesso!',
            'code' => Response::HTTP_OK,
            'data' => [
                'token' => $token,
                'expires_in' => $this->getTokenExpiration()
            ]
        ];
    }

    private function getTokenExpiration(): int
    {
        return JWTAuth::factory()->getTTL() * 60;
    }
}
