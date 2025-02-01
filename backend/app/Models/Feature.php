<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class Feature extends Model
{
    protected $fillable = [
        'id',
        'title',
        'description'
    ];
    protected $table = 'features';
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
