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
use App\Post;

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
    public function follower_list(Request $request)
    {
        $user=JWTAuth::touser($request->header('authorization'));

        $user_id=isset($request->user_id)?$request->user_id:$user->id;
       
        $follower_data=Followers::with('users')->where('user_id',$user_id)->where('status',1)->paginate(10);

        $follower_data=make_null($follower_data);

        $result['total']=get_api_data(isset($follower_data['total']) ? $follower_data['total'] : 0);
        $result['current_page']=get_api_data(isset($follower_data['current_page']) ? $follower_data['total'] : 0);
        $result['prev_page_url']=get_api_data(isset($follower_data['prev_page_url']) ? $follower_data['prev_page_url'] : 0);
        $result['next_page_url']=get_api_data(isset($follower_data['next_page_url']) ? $follower_data['next_page_url'] : 0);
        $result['data']=$follower_data['data'];

        if($result['total'] > 0)
        {
            return response()->json([
                'result' => $result,
                'message' => 'Follower List.',
                'success' => true,
                'status' => 200,
            ],200);
        }
        else
        {
            return response()->json([
                'result' => $result,
                'message' => 'Data Empty.',
                'success' => true,
                'status' => 400,
            ],200);
        }

    }
    public function search(Request $request)
    {
        if(isset($request->search_value) && isset($request->type))
        {
            if($request->type != "people" && $request->type != "post")
            {
                return response()->json([
                  
                    'message' => 'Enter a Valid type.',
                    'success' => true,
                    'status' => 400,
                ],200);
            }
            if($request->type == "people")
            {
                $list_data=User::where('full_name','LIKE', "%$request->search_value%")->paginate(10);
                $list_data=make_null($list_data);

                $result['total']=get_api_data(isset($list_data['total']) ? $list_data['total'] : 0);
                $result['current_page']=get_api_data(isset($list_data['current_page']) ? $list_data['total'] : 0);
                $result['prev_page_url']=get_api_data(isset($list_data['prev_page_url']) ? $list_data['prev_page_url'] : 0);
                $result['next_page_url']=get_api_data(isset($list_data['next_page_url']) ? $list_data['next_page_url'] : 0);
                $result['data']=$list_data['data'];

                if($result['total'] > 0)
                {
                    return response()->json([
                        'result' => $result,
                        'message' => 'Follower List.',
                        'success' => true,
                        'status' => 200,
                    ],200);
                }
                else
                {
                    return response()->json([
                        'result' => $result,
                        'message' => 'Data Empty.',
                        'success' => true,
                        'status' => 400,
                    ],200);
                }
            }
            else if($request->type == "post")
            {
                $list_data=Post::leftjoin('users','users.id','post.user_id')->where('post.description','LIKE', "%$request->search_value%")
                      ->orwhere('users.full_name','LIKE', "%$request->search_value%")->paginate(10);
                
                $list_data=make_null($list_data);

                $result['total']=get_api_data(isset($list_data['total']) ? $list_data['total'] : 0);
                $result['current_page']=get_api_data(isset($list_data['current_page']) ? $list_data['total'] : 0);
                $result['prev_page_url']=get_api_data(isset($list_data['prev_page_url']) ? $list_data['prev_page_url'] : 0);
                $result['next_page_url']=get_api_data(isset($list_data['next_page_url']) ? $list_data['next_page_url'] : 0);
                $result['data']=$list_data['data'];

                if($result['total'] > 0)
                {
                    return response()->json([
                        'result' => $result,
                        'message' => 'Follower List.',
                        'success' => true,
                        'status' => 200,
                    ],200);
                }
                else
                {
                    return response()->json([
                        'result' => $result,
                        'message' => 'Data Empty.',
                        'success' => true,
                        'status' => 400,
                    ],200);
                }
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
