<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RequestStatus extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'key',
        'name',
    ];

    public function requests(): HasMany
    {
        return $this->hasMany(Request::class, 'status_id');
    }

    public function statusHistoryAsOld(): HasMany
    {
        return $this->hasMany(RequestStatusHistory::class, 'old_status_id');
    }

    public function statusHistoryAsNew(): HasMany
    {
        return $this->hasMany(RequestStatusHistory::class, 'new_status_id');
    }
}
