<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MyUsers as MyUsersController;
use App\Http\Controllers\CommonStuff as CommonStuffController;
use Illuminate\Http\Request;
use App\Http\Controllers\Products as ProductsController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function (Request $request) {
    Artisan::call('cache:clear');
    //$request->header('Cache-Control', 'no-cache, must-revalidate, no-store, max-age=0, private');
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::group(['middleware'=>['auth']], function(){
    
    Route::post('/get-logged-in-user-details',[MyUsersController::class,'getLoggedInUserDetails']);
    Route::post('/language-changed',[CommonStuffController::class,'LanguageChanged']);
    Route::get('/get-language',[CommonStuffController::class,'GetCurrentLanguage']);
    
    Route::get('/get-all-products',[ProductsController::class,'GetAllProducts']);
    Route::post('/get-products',[ProductsController::class,'GetProducts']);
});

require __DIR__.'/auth.php';
