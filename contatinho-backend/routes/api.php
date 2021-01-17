<?php

use Illuminate\Support\Facades\Route;

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */


Route::get('/contato', 'App\Http\Controllers\ContatoController@get');
Route::post('/contato', 'App\Http\Controllers\ContatoController@store');
Route::put('/contato/{id}', 'App\Http\Controllers\ContatoController@update');
Route::delete('/contato/{id}', 'App\Http\Controllers\ContatoController@delete');
