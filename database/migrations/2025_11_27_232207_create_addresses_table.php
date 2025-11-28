<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('insured_id')->constrained()->onDelete('cascade');
            $table->string('zip_code', 20)->nullable();
            $table->string('street', 255)->nullable();
            $table->string('number', 50)->nullable();
            $table->string('complement', 100)->nullable();
            $table->string('neighborhood', 150)->nullable();
            $table->string('city', 150)->nullable();
            $table->string('state', 50)->nullable();
            $table->string('country', 100)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index('insured_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
