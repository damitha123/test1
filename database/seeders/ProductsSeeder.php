<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Products as ProductsModel;
use App\Models\Authors as AuthorsModel;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        ProductsModel::factory()->count(1000)->create();
        
        
        
        for ($index1=1;$index1<=1000;$index1++){
            $ProductID = $index1;
            $Product=ProductsModel::find($ProductID);
            $AuthorCount=rand(1,10);
//            $Many=rand(1,100);
//            if($Many>35){
//               $AuthorCount=rand(2,9); 
//            }else{
//               $AuthorCount=rand(1,5);
//            }
            for ($index=1;$index<=$AuthorCount;$index++){
                $AuthorID = rand(1,100);
                $Author=AuthorsModel::find($AuthorID);
                $Authors1=$Product->authors()->get();
                $AlreadyThere=false;
                foreach($Authors1 as $Author1){
                    if($Author1->id==$Author->id){
                        $AlreadyThere=true;
                    }
                }
                if(!$AlreadyThere){
                    $Product->authors()->attach($Author);
                }
                
            }
        }
        
        
        
    }
}
