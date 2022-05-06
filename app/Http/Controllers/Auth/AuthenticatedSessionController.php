<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Cookie;
use App\Models\User as UserModel;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $UserID = $request->input('email');
        
        $QueryStringValue=strval(rand()%100000).strval(rand()%100000).strval(rand()%100000);
        
        if($UserID=='Guest'){
            $user=UserModel::find(3);
            Auth::login($user, TRUE);
            $credentials=array('email'=>$user->email,'password'=>'Guest');
            if(Auth::attempt($credentials)){
                $request->authenticate();
                $request->session()->regenerate();
                return redirect('/dashboard?v='.$QueryStringValue);
            }
            //$request->authenticate();
        }else{
            $request->authenticate();
        }
        

        $request->session()->regenerate();

        return redirect('/dashboard?v='.$QueryStringValue);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();
        
        $Language=$request->cookie('Language');

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        
        $response = new Response("Done",200);
        
        Cookie::queue('Language', $Language, 60);

        return $response;
    }
}
