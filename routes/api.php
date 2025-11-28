<?php

use App\Http\Controllers\Api\InsuredController;
use App\Http\Controllers\Api\PolicyController;
use App\Http\Controllers\Api\RequestController;
use App\Http\Controllers\Api\ValidationController;
use App\Http\Controllers\Api\VehicleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Request APIs
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('requests', RequestController::class);
});

// Query APIs
Route::prefix('queries')->group(function () {
    Route::get('/vehicle', [VehicleController::class, 'getByPlate']);
    Route::get('/insured', [InsuredController::class, 'getByDocument']);
    Route::get('/policy', [PolicyController::class, 'getByPolicyNumber']);
});

// Validation API
Route::post('/validate', [ValidationController::class, 'validateData']);
