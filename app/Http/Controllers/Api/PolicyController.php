<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Policy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PolicyController extends Controller
{
    /**
     * Get policy information by policy number.
     */
    public function getByPolicyNumber(Request $request): JsonResponse
    {
        $request->validate([
            'policy_number' => 'required|string',
        ]);

        $policy = Policy::where('policy_number', $request->policy_number)
            ->with([
                'insurer',
                'product',
                'insured.addresses',
                'insured.user',
                'vehicles',
                'endorsements.endorsementType',
                'claims',
            ])
            ->first();

        if (! $policy) {
            return response()->json([
                'message' => 'Policy not found',
            ], 404);
        }

        return response()->json([
            'data' => $policy,
        ]);
    }
}
