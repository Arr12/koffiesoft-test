<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class Hero extends Model
{
    protected $fillable = [
        'id',
        'name',
        'description',
        'thumbnail',
        'button_text',
    ];

    protected $table = 'hero';
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
