<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Cookie;
use App\Models\LanguageCookieValues as LanguageModel;

class SetMandatoryCookies
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $Language = $request->cookie('Language');
        if ( ! $Language) {
            $ip=$request->ip();
            $count = LanguageModel::where('ip','=',$ip)->count();
            if($count==0){
                $request->cookie(Cookie::make('Language', 'en', 60));
                $Cookie=Cookie::queue('Language', 'en', 60);
                LanguageModel::create([
                    'ip'=>$ip,
                    'language'=>'en'
                ]);
            }else{
                $LanguagValues=LanguageModel::where('ip','=',$ip)->get();
                $LanguagValue=$LanguagValues[0];
                $Language=$LanguagValue->language;
                $Cookie=Cookie::queue('Language', $Language, 60);
                $request->cookie(Cookie::make('Language', $Language, 60));
            }
            
        }else{
            $request->cookie(Cookie::make('Language', $Language, 60));
            $Cookie=Cookie::queue('Language', $Language, 60);
        }
        
        $response = $next($request);
        $response->withHeaders([
            "Pragma" => "no-cache",
            "Expires" => "Fri, 01 Jan 1990 00:00:00 GMT",
            "Cache-Control" => "no-cache, must-revalidate, no-store, max-age=0, private",
        ]);
        
        
        return $response;
    }
}
