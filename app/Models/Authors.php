<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Products as ProductsModel;

class Authors extends Model
{
    use HasFactory;
    protected $table='Authors';
    protected $fillable = [
        'name',
        'email',
        'mobile',
        'address'
    ];
    public function Authors(){
        return $this->hasMany(ProductsModel::class);
    }
}
