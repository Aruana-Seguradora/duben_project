<?php

use App\Http\Controllers\DubenController;
use Illuminate\Support\Facades\Route;

// Rota para o formulário Duben (apenas usuários autenticados não-admin)
Route::middleware(['auth'])->group(function () {
    Route::get('/single-form', [DubenController::class, 'index'])->name('duben.form');
    Route::get('/consulta_placa', [DubenController::class, 'consultaPlaca'])->name('duben.consulta.placa');
    Route::post('/submit-form', [DubenController::class, 'submitForm'])->name('duben.submit.form');
});
