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
        Schema::create('insureds', function (Blueprint $table) {
            $table->id();
            $table->string('type', 30);
            $table->string('full_name', 255);
            $table->string('document_type', 30);
            $table->string('cpf_cnpj', 30)->unique();
            $table->date('birth_date')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('civil_status', 50)->nullable();
            $table->boolean('foreigner')->default(false);
            $table->boolean('politically_exposed')->default(false);
            $table->string('main_activity', 150)->nullable();
            $table->string('monthly_income_range', 50)->nullable();
            $table->string('email', 200)->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('additional_email', 200)->nullable();
            $table->string('additional_phone', 50)->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insureds');
    }
};
