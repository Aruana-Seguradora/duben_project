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
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('policy_id')->constrained()->onDelete('restrict');
            $table->string('status', 100)->nullable();
            $table->string('claim_type', 100)->nullable();
            $table->timestamp('occurred_at')->nullable();
            $table->text('description')->nullable();
            $table->json('third_party_vehicle')->nullable();
            $table->json('accident_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};
