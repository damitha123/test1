<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cookie;
use App\Models\LanguageCookieValues as LanguageModel;

class CommonStuff extends Controller
{
    //
    public function LanguageChanged(Request $request){
        
        $Language=$request->post('Language');
        
        $Cookie=Cookie::queue('Language', $Language, 60);
        
        $ip=$request->ip();
        
        $count=LanguageModel::where('ip','=',$ip)->count();
        
        if($count==0){
            LanguageModel::create([
                'ip'=>$ip,
                'language'=>$Language
            ]);
        }else{
            $LanguagValues = LanguageModel::where('ip','=',$ip)->get();
            $LanguagValue=$LanguagValues[0];
            $LanguagValue->language=$Language;
            $LanguagValue->update();
        }
        
        return response("Done",201)->header('Content-Type', 'text/plain');
    }
    
    public function GetCurrentLanguage(Request $request){
        
        $ip=$request->ip();
        
        $count=LanguageModel::where('ip','=',$ip)->count();
        $Language='';
        
        if($count==0){
            $LanguagValue = LanguageModel::create([
                'ip'=>$ip,
                'language'=>'en'
            ]);
            $Language = $LanguagValue->language;
        }else{
            $LanguagValues = LanguageModel::where('ip','=',$ip)->get();
            $LanguagValue=$LanguagValues[0];
            $Language = $LanguagValue->language;
            
        }
        
        return response($Language,200)->header('Content-Type', 'text/plain');
    }
}
