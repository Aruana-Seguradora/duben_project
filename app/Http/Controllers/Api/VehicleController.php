<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Get vehicle information by plate.
     */
    public function getByPlate(Request $request): JsonResponse
    {
        $request->validate([
            'plate' => 'required|string',
        ]);

        $plate = strtoupper(str_replace([' ', '-'], '', $request->plate));

        $vehicle = Vehicle::where('plate', $plate)
            ->with(['policies.insured', 'policies.insurer', 'policies.product'])
            ->first();

        if (! $vehicle) {
            return response()->json([
                'message' => 'Vehicle not found',
            ], 404);
        }

        return response()->json([
            'data' => $vehicle,
        ]);
    }
}
