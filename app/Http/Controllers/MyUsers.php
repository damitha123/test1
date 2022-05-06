<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MyUsers extends Controller
{
    //
    public function getLoggedInUserDetails(Request $request){
        
        $user=auth()->user();
        
        $response=new Response(json_encode($user, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES),200);
        
        
        return $response;
    }
}
