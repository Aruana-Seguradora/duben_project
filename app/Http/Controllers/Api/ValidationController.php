<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Utils\ValidationHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    /**
     * Validate API request data.
     */
    public function validateData(Request $request): JsonResponse
    {
        $request->validate([
            'type' => 'required|string|in:cpf,cnpj,plate,email,phone',
            'value' => 'required|string',
        ]);

        $type = $request->type;
        $value = $request->value;

        $result = match ($type) {
            'cpf' => ValidationHelper::validateCpf($value),
            'cnpj' => ValidationHelper::validateCnpj($value),
            'plate' => ValidationHelper::validatePlate($value),
            'email' => ValidationHelper::validateEmail($value),
            'phone' => ValidationHelper::validatePhone($value),
            default => ['valid' => false, 'message' => 'Invalid validation type'],
        };

        return response()->json($result);
    }
}
