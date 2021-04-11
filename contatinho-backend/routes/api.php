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


Route::get('/getContatos', 'App\Http\Controllers\ContatoController@get');
Route::get('/getContato/{text}', 'App\Http\Controllers\ContatoController@getUsuario');
Route::post('/newContato', 'App\Http\Controllers\ContatoController@store');
Route::put('/contato', 'App\Http\Controllers\ContatoController@update');
Route::delete('/deleteContato/{id}', 'App\Http\Controllers\ContatoController@delete');
