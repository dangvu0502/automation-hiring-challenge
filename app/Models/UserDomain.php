<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserDomain extends Model
{
    use HasFactory;

    protected $table = 'user_domains';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'redirect_url',
        'mx',
        'redirect_verified_at',
        'mx_verified_at',
    ];

    protected $casts = [
        'mx' => 'array',
        'redirect_verified_at' => 'datetime',
        'mx_verified_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }
}