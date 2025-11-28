<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Insured extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'full_name',
        'document_type',
        'cpf_cnpj',
        'birth_date',
        'gender',
        'civil_status',
        'foreigner',
        'politically_exposed',
        'main_activity',
        'monthly_income_range',
        'email',
        'phone',
        'additional_email',
        'additional_phone',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'foreigner' => 'boolean',
            'politically_exposed' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }

    public function policies(): HasMany
    {
        return $this->hasMany(Policy::class);
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
