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
    Route::post('forgot_password', 'API\LoginController@forgot_password');
    Route::post('get_otp', 'API\LoginController@get_opt');
    Route::post('reset_password', 'API\LoginController@reset_password');
    

    Route::group(['middleware' => 'jwt.verify'], function () {
        Route::get('logout', 'API\LoginController@logout');
        Route::get('getProfile', 'API\LoginController@edit_profile');
        Route::post('updateprofile', 'API\LoginController@post_profile');
        Route::post('upload_cover_profile', 'API\UserController@cover_image');
        Route::post('add_follower', 'API\UserController@add_follower');
        Route::post('follower_list', 'API\UserController@follower_list');
        Route::post('search', 'API\UserController@search');

        Route::group(['prefix' => 'gallery'], function () {
            Route::post('list', 'API\GalleryController@list_images');
            Route::post('upload-images', 'API\GalleryController@upload_images');
        });

        Route::group(['prefix' => 'posts'], function () {
            Route::get('list', 'API\PostController@list');
            Route::post('add_post', 'API\PostController@store');
            Route::post('add_like', 'API\PostController@add_like');
            Route::post('add_comment', 'API\PostController@add_comment');
            Route::post('add_comment__like', 'API\PostController@add_comment__like');
            Route::post('view_comment_all_message', 'API\PostController@view_comment_all_message');
            Route::post('view_reply_all_message', 'API\PostController@view_reply_all_message');
            Route::post('my_post_list', 'API\PostController@my_post_list');
        });

        Route::group(['prefix' => 'requests'], function () {
            Route::post('send_request', 'API\RequestController@send_request');
            Route::post('request_action', 'API\RequestController@request_action');
            Route::get('send_request_list', 'API\RequestController@send_request_list');
            Route::get('received_request_list', 'API\RequestController@received_request_list');
            Route::post('crew_list', 'API\RequestController@crew_list');
            Route::post('mutual_list', 'API\RequestController@mutual_list');
        });   

    });
});