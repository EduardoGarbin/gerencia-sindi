<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $authResult = $this->authService->login($credentials);

        return response()->json([
            'message' => $authResult['message'],
            'data' => $authResult['data']
        ], $authResult['code']);
    }
}
