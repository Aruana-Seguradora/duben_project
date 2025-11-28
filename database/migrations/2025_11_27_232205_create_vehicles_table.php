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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('plate', 30)->unique();
            $table->string('chassis', 100)->nullable();
            $table->string('renavam', 100)->nullable();
            $table->string('manufacturer', 150)->nullable();
            $table->string('model', 150)->nullable();
            $table->smallInteger('year')->nullable();
            $table->string('use_type', 100)->nullable();
            $table->string('capacity', 50)->nullable();
            $table->string('color', 50)->nullable();
            $table->string('vin', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
