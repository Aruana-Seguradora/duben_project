<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Policy extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_number',
        'insurer_id',
        'product_id',
        'insured_id',
        'status',
        'start_date',
        'end_date',
        'premium',
        'currency',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'premium' => 'decimal:2',
        ];
    }

    public function insurer(): BelongsTo
    {
        return $this->belongsTo(Insurer::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function insured(): BelongsTo
    {
        return $this->belongsTo(Insured::class);
    }

    public function vehicles(): BelongsToMany
    {
        return $this->belongsToMany(Vehicle::class, 'policy_vehicles')
            ->withPivot('covered');
    }

    public function endorsements(): HasMany
    {
        return $this->hasMany(Endorsement::class);
    }

    public function requests(): HasMany
    {
        return $this->hasMany(Request::class);
    }

    public function claims(): HasMany
    {
        return $this->hasMany(Claim::class);
    }
}
