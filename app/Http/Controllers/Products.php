<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products as ProductsModel;
use Illuminate\Support\Facades\DB;
use \DateTime;

class Products extends Controller
{
    //
    public function GetAllProducts(Request $request){
        
        $Products=ProductsModel::all();
        
        $ModifiedProducts=array();
        
        foreach($Products as $Product){
            $ModifiedProduct=array('id'=>$Product->id,'name'=>$Product->name,'date'=>$Product->date,'authors'=>$Product->authors()->get());
            array_push($ModifiedProducts,$ModifiedProduct);
        }
        
        return json_encode($ModifiedProducts, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }
    
    public function GetProducts(Request $request){
        
        $Options=$request->json('Options');
        
        $ModifiedProducts=array();
        $TotalPages=0;
        $TotalRows=0;
        
        if($Options['NameType']=='NotFiltered'&&$Options['DateType']=='NotFiltered'&&$Options['AuthorType']=='NotFiltered'){

            $sql1='SELECT COUNT(*) AS count1 FROM products INNER JOIN authors_products ON products.id=authors_products.products_id INNER JOIN authors ON authors_products.authors_id=authors.id;';
                        
            //$pdo->
            $CountRow=DB::select($sql1);
            $TotalRows=$CountRow[0]->count1;
            $TotalPages=round($TotalRows/10);
            $Page=abs($Options['Page']);
            if($Page>$TotalPages){
                $Page=$TotalPages;
            }
            
            $Offset=0;
            if($Page>1){
                $Offset=($Page-1)*10;
            }
            
            $sql2='';
            if($Offset==0){
                $sql2='SELECT products.id AS id FROM products INNER JOIN authors_products ON products.id=authors_products.products_id INNER JOIN authors ON authors_products.authors_id=authors.id LIMIT 10;';
            }else{
                $sql2='SELECT products.id AS id FROM products INNER JOIN authors_products ON products.id=authors_products.products_id INNER JOIN authors ON authors_products.authors_id=authors.id LIMIT 10, '.$Offset.';';
            }
            
            
            $Products=DB::select($sql2);
            
            foreach($Products as $Product1){
                $Product= ProductsModel::find($Product1->id);
                $ModifiedProduct=array('id'=>$Product->id,'name'=>$Product->name,'date'=>$Product->date,'authors'=>$Product->authors()->get());
                array_push($ModifiedProducts,$ModifiedProduct);
            }
            
            
        }else{
            
            //$pdo=DB::getPdo();
            
            $sql='WHERE ';
            if($Options['NameType']!='NotFiltered'){
                $Options['NameValue']= str_replace(';', '', $Options['NameValue']);
                if($Options['NameType']=='StartsWith'){
                    if($sql=='WHERE '){
                        $sql.=' products.name LIKE "'.$Options['NameValue'].'%"' ;
                    }else{
                        $sql.=' AND products.name LIKE "'.$Options['NameValue'].'%"' ;
                    }
                    
                }else if($Options['NameType']=='EndsWith'){
                    if($sql=='WHERE '){
                        $sql.=' products.name LIKE "%'.$Options['NameValue'].'"' ;
                    }else{
                        $sql.=' AND products.name LIKE "%'.$Options['NameValue'].'"' ;
                    }
                    
                }else if($Options['NameType']=='Contains'){
                    if($sql=='WHERE '){
                        $sql.=' products.name LIKE "%'.$Options['NameValue'].'%"' ;
                    }else{
                        $sql.=' AND products.name LIKE "%'.$Options['NameValue'].'%"' ;
                    }
                    
                }
                else if($Options['NameType']=='IsEqualTo'){
                    if($sql=='WHERE '){
                        $sql.=' products.name = "'.$Options['NameValue'].'"' ;
                    }else{
                        $sql.=' AND products.name = "'.$Options['NameValue'].'"' ;
                    }
                    
                }
            }
            if($Options['DateType']!='NotFiltered'){
                
                if($Options['DateType']=='Before'){
                    $Options['DateValue']= str_replace(';', '', $Options['DateValue']);
                    $Options['DateValue']= explode('T', $Options['DateValue'])[0];
                    if($sql=='WHERE '){
                        $sql.=' date <"'.$Options['DateValue'].'"' ;
                    }else{
                        $sql.=' AND date < "'.$Options['DateValue'].'"' ;
                    }
                    
                }else if($Options['DateType']=='After'){
                    $Options['DateValue']= str_replace(';', '', $Options['DateValue']);
                    $Options['DateValue']= explode('T', $Options['DateValue'])[0];
                    if($sql=='WHERE '){
                        $sql.=' date > "'.$Options['DateValue'].'"' ;
                    }else{
                        $sql.=' AND date > "'.$Options['DateValue'].'"' ;
                    }
                    
                }else if($Options['DateType']=='IsEqualTo'){
                    $Date = explode('T', $Options['DateValue'])[0];
                    $StartDate= new DateTime($Date);
                    //$StartDate->modify('-1 day');
                    $StartDate= $StartDate->format('Y-m-d').' 23:59:59';
                    $EndDate= new DateTime($Date);
                    $EndDate->modify('+1 day');
                    $EndDate= $EndDate->format('Y-m-d').' 23:59:59';
                    if($sql=='WHERE '){
                        $sql.=' date > "'.$StartDate.'" AND date < "'.$EndDate.'"' ;
                    }else{
                        $sql.=' AND date > "'.$StartDate.'" AND date < "'.$EndDate.'"' ;
                    }
                    
                }else if($Options['DateType']=='Between'){
                    $Date=$Options['DateValue'];
                    $StartDate= $Options['StartDate'];
                    $EndDate= $Options['EndDate'];
                    if($sql=='WHERE '){
                        $sql.=' date >= "'.$StartDate.'" AND date <= "'.$EndDate.'"' ;
                    }else{
                        $sql.=' AND date >= "'.$StartDate.'" AND date <= "'.$EndDate.'"' ;
                    }
                    
                }
            }
            if($Options['AuthorType']!='NotFiltered'){
                $Options['AuthorValue']= str_replace(';', '', $Options['AuthorValue']);
                if($Options['AuthorType']=='StartsWith'){
                    if($sql=='WHERE '){
                        $sql.=' authors.name LIKE "'.$Options['AuthorValue'].'%"' ;
                    }else{
                        $sql.=' AND authors.name LIKE "'.$Options['AuthorValue'].'%"' ;
                    }
                    
                }else if($Options['AuthorType']=='EndsWith'){
                    if($sql=='WHERE '){
                        $sql.=' authors.name LIKE "%'.$Options['AuthorValue'].'"' ;
                    }else{
                        $sql.=' AND authors.name LIKE "%'.$Options['AuthorValue'].'"' ;
                    }
                    
                }else if($Options['AuthorType']=='Contains'){
                    if($sql=='WHERE '){
                        $sql.=' authors.name LIKE "%'.$Options['AuthorValue'].'%"' ;
                    }else{
                        $sql.=' AND authors.name LIKE "%'.$Options['AuthorValue'].'%"' ;
                    }
                    
                }
                else if($Options['AuthorType']=='IsEqualTo'){
                    if($sql=='WHERE '){
                        $sql.=' authors.name = "'.$Options['AuthorValue'].'"' ;
                    }else{
                        $sql.=' AND authors.name = "'.$Options['AuthorValue'].'"' ;
                    }
                    
                }
            }
            $sql1='SELECT COUNT(*) AS count1 FROM products INNER JOIN authors_products ON products.id=authors_products.products_id INNER JOIN authors ON authors_products.authors_id=authors.id '.$sql;
                        
            //$pdo->
            $CountRow=DB::select($sql1);
            $TotalRows=$CountRow[0]->count1;
            $TotalPages=round($TotalRows/10);
            $Page=abs($Options['Page']);
            if($Page>$TotalPages){
                $Page=$TotalPages;
            }
            
            $Offset=0;
            if($Page>1){
                $Offset=($Page-1)*10;
            }
            
            $sql2='';
            if($Offset==0){
                $sql2='SELECT products.id AS id FROM products INNER JOIN authors_products ON products.id=authors_products.products_id INNER JOIN authors ON authors_products.authors_id=authors.id '.$sql.' LIMIT 10;';
            }else{
                $sql2='SELECT products.id AS id FROM products INNER JOIN authors_products ON products.id=authors_products.products_id INNER JOIN authors ON authors_products.authors_id=authors.id '.$sql.' LIMIT 10, '.$Offset.';';
            }
            
            
            $Products=DB::select($sql2);
            
            foreach($Products as $Product1){
                $Product= ProductsModel::find($Product1->id);
                $ModifiedProduct=array('id'=>$Product->id,'name'=>$Product->name,'date'=>$Product->date,'authors'=>$Product->authors()->get());
                array_push($ModifiedProducts,$ModifiedProduct);
            }
            
        }
        
        $response=array('TotalRows'=>$TotalRows,'TotalPages'=>$TotalPages, 'Data'=>$ModifiedProducts);

        return json_encode($response, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }
}
