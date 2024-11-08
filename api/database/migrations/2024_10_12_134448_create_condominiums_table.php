<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('condominiums', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('cnpj')->unique()->nullable();
            $table->string('cpf')->unique()->nullable();
            $table->integer('blocks');
            $table->integer('units');
            $table->date('construction_date')->nullable();
            $table->string('manager_name')->nullable();
            $table->string('manager_contact')->nullable();
            $table->decimal('total_area', 8, 2)->nullable();
            $table->boolean('status')->default(true);
            $table->date('management_start_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('condominiums');
    }
};
