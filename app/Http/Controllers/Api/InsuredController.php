<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Insured;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InsuredController extends Controller
{
    /**
     * Get insured information by CPF/CNPJ.
     */
    public function getByDocument(Request $request): JsonResponse
    {
        $request->validate([
            'cpf_cnpj' => 'required|string',
        ]);

        $document = preg_replace('/[^0-9]/', '', $request->cpf_cnpj);

        $insured = Insured::where('cpf_cnpj', $document)
            ->with([
                'addresses',
                'policies.insurer',
                'policies.product',
                'policies.vehicles',
                'user',
            ])
            ->first();

        if (! $insured) {
            return response()->json([
                'message' => 'Insured not found',
            ], 404);
        }

        return response()->json([
            'data' => $insured,
        ]);
    }
}
