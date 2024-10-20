<?php

namespace App\Services;

use App\Models\Condominium;
use Illuminate\Database\Eloquent\Collection;

class CondominiumService
{
    public function getAllCondominiums(): Collection
    {
        try {
            return Condominium::all();
        } catch (\Exception $e) {
            throw new \Exception("Erro ao listar os condomínios. {$e->getMessage()}");
        }
    }

    public function createCondominium(array $data): Condominium
    {
        try {
            return Condominium::create($data);
        } catch (\Exception $e) {
            throw new \Exception("Erro ao criar o condomínio. {$e->getMessage()}");
        }
    }

    public function getCondominiumById(int $id): Condominium
    {
        $condominium = Condominium::find($id);

        if (!$condominium) {
            throw new \Exception('Condomínio não encontrado.');
        }

        return $condominium;
    }

    public function updateCondominium(int $id, array $data): Condominium
    {
        $condominium = $this->getCondominiumById($id);

        if (!$condominium) {
            throw new \Exception('Condomínio não encontrado.');
        }

        $condominium->update($data);

        return $condominium;
    }

    public function deleteCondominium(int $id): void
    {
        $condominium = $this->getCondominiumById($id);

        if (!$condominium) {
            throw new \Exception('Condomínio não encontrado.');
        }

        $condominium->delete();
    }
}
