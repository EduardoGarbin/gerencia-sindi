<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResidentRequest;
use App\Services\ResidentService;
use Illuminate\Http\JsonResponse;

class ResidentController extends Controller
{
    protected $residentService;

    public function __construct(ResidentService $residentService)
    {
        $this->residentService = $residentService;
    }

    public function index(): JsonResponse
    {
        try {
            $residents = $this->residentService->getAllResidents();
            return response()->json($residents, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(ResidentRequest $request): JsonResponse
    {
        try {
            $resident = $this->residentService->createResident($request->validated());
            return response()->json([
                'message' => 'Morador criado com sucesso!',
                'data' => $resident
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $resident = $this->residentService->getResidentById($id);
            return response()->json($resident, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function update(ResidentRequest $request, int $id): JsonResponse
    {
        try {
            $resident = $this->residentService->updateResident($id, $request->validated());
            return response()->json([
                'message' => 'Morador atualizado com sucesso!',
                'data' => $resident
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $this->residentService->deleteResident($id);
            return response()->json(['message' => 'Morador excluído com sucesso!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
