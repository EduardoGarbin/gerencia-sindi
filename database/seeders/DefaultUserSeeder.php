<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DefaultUserSeeder extends Seeder
{
    public function run(): void
    {
        $this->createDefaultUser();
    }

    private function createDefaultUser(): void
    {
        User::firstOrCreate([
            'email' => config('user.email'),
        ], [
            'name' => config('user.name'),
            'password' => Hash::make('user.password'),
        ]);
    }
}
