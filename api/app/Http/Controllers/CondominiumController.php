<?php

namespace App\Http\Controllers;

use App\Http\Requests\CondominiumRequest;
use App\Services\CondominiumService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CondominiumController extends Controller
{
    private $condominiumService;

    public function __construct(CondominiumService $condominiumService)
    {
        $this->condominiumService = $condominiumService;
    }

    public function index(): JsonResponse
    {
        try {
            $condominiums = $this->condominiumService->getAllCondominiums();
            return response()->json([
                'data' => $condominiums
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(CondominiumRequest $request): JsonResponse
    {
        try {
            $condominium = $this->condominiumService->createCondominium($request->validated());

            return response()->json([
                'message' => 'Condomínio criado com sucesso!',
                'data' => $condominium
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $condominium = $this->condominiumService->getCondominiumById($id);
            return response()->json($condominium);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(CondominiumRequest $request, int $id): JsonResponse
    {
        try {
            $condominium = $this->condominiumService->updateCondominium($id, $request->validated());

            return response()->json([
                'message' => 'Condomínio atualizado com sucesso!',
                'data' => $condominium
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $this->condominiumService->deleteCondominium($id);
            return response()->json(['message' => 'Condomínio excluído com sucesso!']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
