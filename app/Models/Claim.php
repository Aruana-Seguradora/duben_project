<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Claim extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_id',
        'status',
        'claim_type',
        'occurred_at',
        'description',
        'third_party_vehicle',
        'accident_address',
    ];

    protected function casts(): array
    {
        return [
            'occurred_at' => 'datetime',
            'third_party_vehicle' => 'array',
            'accident_address' => 'array',
        ];
    }

    public function policy(): BelongsTo
    {
        return $this->belongsTo(Policy::class);
    }
}
