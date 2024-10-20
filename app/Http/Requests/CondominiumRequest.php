<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CondominiumRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'cnpj' => 'nullable|string|unique:condominiums,cnpj,' . $this->route('condominium'),
            'cpf' => 'nullable|string|unique:condominiums,cpf,' . $this->route('condominium'),
            'blocks' => 'required|integer',
            'units' => 'required|integer',
            'construction_date' => 'nullable|date',
            'manager_name' => 'nullable|string|max:255',
            'manager_contact' => 'nullable|string|max:255',
            'total_area' => 'nullable|numeric',
            'status' => 'boolean',
            'management_start_date' => 'nullable|date',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome do condomínio é obrigatório.',
            'name.string' => 'O nome do condomínio deve ser um texto.',
            'name.max' => 'O nome do condomínio não pode ter mais de 255 caracteres.',

            'address.required' => 'O endereço do condomínio é obrigatório.',
            'address.string' => 'O endereço do condomínio deve ser um texto.',
            'address.max' => 'O endereço não pode ter mais de 255 caracteres.',

            'cnpj.string' => 'O CNPJ deve ser um texto válido.',
            'cnpj.unique' => 'Este CNPJ já está em uso. Por favor, insira um CNPJ único.',
            'cnpj.required_without' => 'O CNPJ é obrigatório se o CPF não for fornecido.',

            'cpf.string' => 'O CPF deve ser um texto válido.',
            'cpf.unique' => 'Este CPF já está em uso. Por favor, insira um CPF único.',
            'cpf.required_without' => 'O CPF é obrigatório se o CNPJ não for fornecido.',

            'blocks.required' => 'A quantidade de blocos é obrigatória.',
            'blocks.integer' => 'A quantidade de blocos deve ser um número inteiro.',

            'units.required' => 'A quantidade de unidades é obrigatória.',
            'units.integer' => 'A quantidade de unidades deve ser um número inteiro.',

            'construction_date.date' => 'A data de construção deve ser uma data válida.',

            'manager_name.string' => 'O nome do síndico deve ser um texto válido.',
            'manager_name.max' => 'O nome do síndico não pode ter mais de 255 caracteres.',

            'manager_contact.string' => 'O contato do síndico deve ser um texto válido.',
            'manager_contact.max' => 'O contato do síndico não pode ter mais de 255 caracteres.',

            'total_area.numeric' => 'A área total deve ser um número.',

            'status.boolean' => 'O status deve ser verdadeiro (true) ou falso (false).',

            'management_start_date.date' => 'A data de início da gestão deve ser uma data válida.',
        ];
    }
}
