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
    Route::post('register', 'API\LoginController@register');
    Route::post('login', 'API\LoginController@login');

    Route::group(['middleware' => 'jwt.verify'], function () {
        Route::get('logout', 'API\LoginController@logout');
        Route::get('edit_profile', 'API\LoginController@edit_profile');
        Route::post('post_profile', 'API\LoginController@post_profile');
        Route::post('upload_cover_profile', 'API\UserController@cover_image');
        Route::post('add_follower', 'API\UserController@add_follower');

        Route::group(['prefix' => 'gallery'], function () {
            Route::get('list', 'API\GalleryController@list_images');
            Route::post('upload-images', 'API\GalleryController@upload_images');
        });

        Route::group(['prefix' => 'posts'], function () {
            Route::get('list', 'API\PostController@list');
            Route::post('add_post', 'API\PostController@store');
            Route::post('add_like', 'API\PostController@add_like');
            Route::post('add_comment', 'API\PostController@add_comment');
            Route::post('view_all_message', 'API\PostController@view_all_message');
            Route::post('view_reply_all_message', 'API\PostController@view_reply_all_message');
        });
        Route::group(['prefix' => 'requests'], function () {
            Route::post('send_request', 'API\RequestController@send_request');
        });   

    });
});