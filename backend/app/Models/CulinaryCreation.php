<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class CulinaryCreation extends Model
{
    protected $fillable = [
        'id',
        'name',
        'thumbnail',
    ];

    protected $table = 'culinary_creations';
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function boot() {
        parent::boot();
        static::creating(function ($model) {
            if(empty($model->id)) {
                $model->id = Uuid::uuid4();
            }
        });
    }
}
