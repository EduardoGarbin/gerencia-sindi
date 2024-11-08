<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Condominium extends Model
{
    use HasFactory;

    protected $table = 'condominiums';

    protected $fillable = [
        'name', 
        'address', 
        'cnpj', 
        'cpf', 
        'blocks', 
        'units', 
        'construction_date', 
        'manager_name', 
        'manager_contact', 
        'total_area', 
        'status', 
        'management_start_date'
    ];

    protected $casts = [
        'construction_date' => 'date', 
        'management_start_date' => 'date',
        'total_area' => 'decimal:2',
        'status' => 'boolean',
    ];

    public function residents()
    {
        return $this->hasMany(Resident::class);
    }
}
