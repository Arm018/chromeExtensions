<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AliProduct extends Model
{
    use HasFactory;

    protected $fillable =
        [
            'productId', 'title', 'productType', 'collection', 'quantity', 'price', 'description'
        ];
}
