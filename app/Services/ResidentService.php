<?php

namespace App\Services;

use App\Models\Resident;
use Illuminate\Database\Eloquent\Collection;

class ResidentService
{
    public function getAllResidents(): Collection
    {
        return Resident::all();
    }

    public function createResident(array $data): Resident
    {
        try {
            return Resident::create($data);
        } catch (\Exception $e) {
            throw new \Exception("Erro ao criar o morador. {$e->getMessage()}");
        }
    }

    public function getResidentById(int $id): Resident
    {
        $resident = Resident::find($id);

        if (!$resident) {
            throw new \Exception('Morador não encontrado.');
        }

        return $resident;
    }

    public function updateResident(int $id, array $data): Resident
    {
        $resident = $this->getResidentById($id);

        if (!$resident) {
            throw new \Exception('Morador não encontrado.');
        }

        $resident->update($data);

        return $resident;
    }

    public function deleteResident(int $id): void
    {
        $resident = $this->getResidentById($id);

        if (!$resident) {
            throw new \Exception('Morador não encontrado.');
        }

        $resident->delete();
    }
}
