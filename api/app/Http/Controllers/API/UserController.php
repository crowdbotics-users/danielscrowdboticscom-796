<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Hash;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;
use App\Followers;

class UserController extends Controller
{
    //
    public function cover_image(Request $request)
    {
        if(isset($request->cover_image))
        {
            $user= JWTAuth::touser($request->header('authorization'));
            $user_update=User::find($user->id);
            if($user_update != null)
            {
                $image=$request->cover_image;
                $imageName = str_replace(' ', '_', $user->id).'_'.uniqid(time()) . '.' . $image->getClientOriginalExtension();
        
                uploadImage($image,'uploads/user/thumbnail',$imageName,'150','150');
                $image_path = uploadImage($image,'uploads/user/cover/',$imageName,'1200','400');
        
                $user_update->cover_image = $image_path;
                $user_update->save();

                $result=make_null($user_update);

                return response()->json([
                    'result' => $result,
                    'message' => 'Your Cover Image Updated Successfully.',
                    'success' => true,
                    'status' => 200,
                ],200);

            }  
            else
            {
                return response()->json([
                    'success' => false,
                    'message' => 'User Not Found.',
                    'status'  => 400
                ], 200);
            }
        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        }
    }
    public function user_profile(Request $request)
    {
        if(isset($request->user_id))
        {
            $user=User::find($user->id);
            if($user != null)
            {
                $result=make_null($user);

                return response()->json([
                    'result' => $result,
                    'message' => 'User Details.',
                    'success' => true,
                    'status' => 200,
                ],200);
            }
            else
            {
                return response()->json([
                    'success' => false,
                    'message' => 'User Not Found.',
                    'status'  => 400
                ], 200);
            }
            
        } 
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        }
    }
    public function add_follower(Request $request)
    {
        if(isset($request->user_id))
        {
            $user=User::find($request->user_id);
            if($user != null)
            {
                $user_follower= JWTAuth::touser($request->header('authorization'));
                $follower_data=Followers::where('user_id',$user->id)->where('follower_id',$user_follower->id)->first();
                if($user->id == $user_follower->id)
                {
                    return response()->json([
                        'message' => 'can not Follow itself.',
                        'success' => true,
                        'status' => 400,
                    ],200);  
                }
                if($follower_data != null)
                {
                    $follower_data->delete();
                    $result['follower'] = make_null($user);
                    $result['users'] = make_null($user_follower);
                    return response()->json([
                        'result' => $result,
                        'message' => 'Success.',
                        'success' => true,
                        'status' => 200,
                    ],200);
                }
                
                $follower=new Followers();
                $follower->user_id=$user->id;
                $follower->follower_id=$user_follower->id;
                $follower->status=1;
                $follower->save();

                $result['follower'] = make_null($user);
                $result['users'] = make_null($user_follower);

                return response()->json([
                    'result' => $result,
                    'message' => 'Success.',
                    'success' => true,
                    'status' => 200,
                ],200);

            }
            else
            {
                return response()->json([
                    'success' => false,
                    'message' => 'User Not Found.',
                    'status'  => 400
                ], 200);
            }
        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);

        }
    }
}
