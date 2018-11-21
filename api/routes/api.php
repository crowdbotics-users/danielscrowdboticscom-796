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
        Route::post('upload_cover_profile', 'Api\UserController@cover_image');
        Route::post('add_follower', 'Api\UserController@add_follower');

        Route::group(['prefix' => 'gallery'], function () {
            Route::get('list', 'Api\GalleryController@list_images');
            Route::post('upload-images', 'Api\GalleryController@upload_images');
        });

        Route::group(['prefix' => 'posts'], function () {
            Route::get('list', 'Api\PostController@list');
            Route::post('add_post', 'Api\PostController@store');
            Route::post('add_like', 'Api\PostController@add_like');
            Route::post('add_comment', 'Api\PostController@add_comment');
            Route::post('view_all_message', 'Api\PostController@view_all_message');
            Route::post('view_reply_all_message', 'Api\PostController@view_reply_all_message');
        });
        Route::group(['prefix' => 'requests'], function () {
            Route::post('send_request', 'Api\RequestController@send_request');
        });   

    });
});