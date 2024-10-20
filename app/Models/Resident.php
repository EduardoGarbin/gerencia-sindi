<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'cpf',
        'birth_date',
        'unit',
        'condominium_id',
        'status',
        'move_in_date',
        'move_out_date',
        'notes'
    ];

    public function condominium()
    {
        return $this->belongsTo(Condominium::class);
    }
}
