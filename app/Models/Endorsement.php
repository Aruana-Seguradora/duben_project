<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Endorsement extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_id',
        'endorsement_type_id',
        'effective_date',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'effective_date' => 'date',
        ];
    }

    public function policy(): BelongsTo
    {
        return $this->belongsTo(Policy::class);
    }

    public function endorsementType(): BelongsTo
    {
        return $this->belongsTo(EndorsementType::class);
    }
}
