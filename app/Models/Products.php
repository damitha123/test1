<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Authors as AuthorsModel;

class Products extends Model
{
    use HasFactory;
    protected $table='products';
    protected $fillable = [
        'name',
        'description',
        'slug',
        'url',
        'price',
        'date'
    ];
    
    public function Authors(){
        return $this->belongsToMany(AuthorsModel::class);
    }
}
