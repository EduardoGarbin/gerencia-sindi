<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('cpf')->unique()->nullable();
            $table->date('birth_date')->nullable();
            $table->string('unit');
            $table->foreignId('condominium_id')->constrained('condominiums')->onDelete('cascade');
            $table->boolean('status')->default(true);
            $table->date('move_in_date')->nullable();
            $table->date('move_out_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
