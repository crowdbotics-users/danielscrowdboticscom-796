<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'users'], function () {
    Route::post('register', 'Api\LoginController@register');
    Route::post('login', 'Api\LoginController@login');

    Route::group(['middleware' => 'jwt.verify'], function () {
        Route::get('logout', 'Api\LoginController@logout');
        Route::get('edit_profile', 'Api\LoginController@edit_profile');
        Route::post('post_profile', 'Api\LoginController@post_profile');
    });
});