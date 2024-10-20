<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResidentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:residents,email',
            'phone' => 'nullable|string|max:20',
            'cpf' => 'nullable|string|unique:residents,cpf|size:11',
            'birth_date' => 'nullable|date',
            'unit' => 'required|string|max:10',
            'condominium_id' => 'required|exists:condominiums,id',
            'status' => 'boolean',
            'move_in_date' => 'nullable|date',
            'move_out_date' => 'nullable|date|after_or_equal:move_in_date',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome do morador é obrigatório.',
            'cpf.unique' => 'Esse CPF já está cadastrado.',
            'unit.required' => 'A unidade é obrigatória.',
            'condominium_id.required' => 'O ID do condomínio é obrigatório.',
            'condominium_id.exists' => 'O condomínio selecionado não existe.',
        ];
    }
}
