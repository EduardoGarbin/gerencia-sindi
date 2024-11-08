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
            'name.string' => 'O nome do morador deve ser um texto.',
            'name.max' => 'O nome do morador não pode ter mais de 255 caracteres.',

            'email.string' => 'O email deve ser um texto.',
            'email.email' => 'O email fornecido não é válido.',
            'email.max' => 'O email não pode ter mais de 255 caracteres.',
            'email.unique' => 'Esse email já está cadastrado.',

            'phone.string' => 'O telefone deve ser um texto.',
            'phone.max' => 'O telefone não pode ter mais de 20 caracteres.',

            'cpf.unique' => 'Esse CPF já está cadastrado.',
            'cpf.string' => 'O CPF deve ser um texto.',
            'cpf.size' => 'O CPF deve ter exatamente 11 dígitos.',

            'birth_date.date' => 'A data de nascimento deve ser uma data válida.',

            'unit.required' => 'A unidade é obrigatória.',
            'unit.string' => 'A unidade deve ser um texto.',
            'unit.max' => 'A unidade não pode ter mais de 10 caracteres.',

            'condominium_id.required' => 'O ID do condomínio é obrigatório.',
            'condominium_id.exists' => 'O condomínio selecionado não existe.',

            'status.boolean' => 'O status deve ser verdadeiro ou falso.',

            'move_in_date.date' => 'A data de entrada deve ser uma data válida.',
            'move_out_date.date' => 'A data de saída deve ser uma data válida.',
            'move_out_date.after_or_equal' => 'A data de saída deve ser igual ou posterior à data de entrada.'
        ];
    }
}
