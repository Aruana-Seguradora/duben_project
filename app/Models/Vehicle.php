<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'plate',
        'chassis',
        'renavam',
        'manufacturer',
        'model',
        'year',
        'use_type',
        'capacity',
        'color',
        'vin',
    ];

    public function policies(): BelongsToMany
    {
        return $this->belongsToMany(Policy::class, 'policy_vehicles')
            ->withPivot('covered');
    }

    public function requests(): HasMany
    {
        return $this->hasMany(Request::class);
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class);
    }
}
