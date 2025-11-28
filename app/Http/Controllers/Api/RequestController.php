<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Request as RequestModel;
use App\Models\RequestStatus;
use App\Models\RequestType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Str;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(HttpRequest $httpRequest): JsonResponse
    {
        $query = RequestModel::with(['requestType', 'status', 'insured', 'policy', 'vehicle', 'creator', 'assignee']);

        if ($httpRequest->has('status_id')) {
            $query->where('status_id', $httpRequest->status_id);
        }

        if ($httpRequest->has('request_type_id')) {
            $query->where('request_type_id', $httpRequest->request_type_id);
        }

        if ($httpRequest->has('insured_id')) {
            $query->where('insured_id', $httpRequest->insured_id);
        }

        $requests = $query->paginate($httpRequest->get('per_page', 15));

        return response()->json($requests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(HttpRequest $httpRequest): JsonResponse
    {
        $validated = $httpRequest->validate([
            'request_type_id' => 'required|exists:request_types,id',
            'insured_id' => 'required|exists:insureds,id',
            'policy_id' => 'nullable|exists:policies,id',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'priority' => 'nullable|string|max:30',
            'subject' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'metadata' => 'nullable|array',
        ]);

        $pendingStatus = RequestStatus::where('key', 'pending')->firstOrFail();

        $request = RequestModel::create([
            'reference' => $this->generateReference(),
            'request_type_id' => $validated['request_type_id'],
            'status_id' => $pendingStatus->id,
            'insured_id' => $validated['insured_id'],
            'policy_id' => $validated['policy_id'] ?? null,
            'vehicle_id' => $validated['vehicle_id'] ?? null,
            'priority' => $validated['priority'] ?? null,
            'subject' => $validated['subject'] ?? null,
            'description' => $validated['description'] ?? null,
            'metadata' => $validated['metadata'] ?? null,
            'created_by' => $httpRequest->user()->id,
        ]);

        $request->load(['requestType', 'status', 'insured', 'policy', 'vehicle', 'creator']);

        return response()->json($request, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RequestModel $request): JsonResponse
    {
        $request->load([
            'requestType',
            'status',
            'insured',
            'policy',
            'vehicle',
            'creator',
            'assignee',
            'statusHistory.oldStatus',
            'statusHistory.newStatus',
            'statusHistory.changedBy',
            'attachments',
            'comments.user',
        ]);

        return response()->json($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(HttpRequest $httpRequest, RequestModel $request): JsonResponse
    {
        $validated = $httpRequest->validate([
            'status_id' => 'sometimes|exists:request_statuses,id',
            'policy_id' => 'nullable|exists:policies,id',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'priority' => 'nullable|string|max:30',
            'subject' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'metadata' => 'nullable|array',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $oldStatusId = $request->status_id;

        $request->update($validated);

        if (isset($validated['status_id']) && $validated['status_id'] != $oldStatusId) {
            $request->statusHistory()->create([
                'old_status_id' => $oldStatusId,
                'new_status_id' => $validated['status_id'],
                'changed_by' => $httpRequest->user()->id,
            ]);
        }

        $request->load(['requestType', 'status', 'insured', 'policy', 'vehicle', 'creator', 'assignee']);

        return response()->json($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequestModel $request): JsonResponse
    {
        $request->delete();

        return response()->json(['message' => 'Request deleted successfully'], 200);
    }

    /**
     * Generate a unique reference for the request.
     */
    private function generateReference(): string
    {
        do {
            $reference = 'REQ-' . strtoupper(Str::random(8));
        } while (RequestModel::where('reference', $reference)->exists());

        return $reference;
    }
}
