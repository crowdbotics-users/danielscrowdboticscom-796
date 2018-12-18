<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pictures;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class GalleryController extends Controller
{
    //

    public function list_images(Request $request)
    {
            $user=JWTAuth::touser($request->header('authorization'));

            $user_id=isset($request->user_id)?$request->user_id:$user->id;

       
            $user=User::find($user_id);

            if($user != null)
            {
                $pictures=Pictures::where('user_id',$user_id)->paginate(10);

                $pictures=make_null($pictures);
                $result['total']=get_api_data(isset($pictures['total']) ? $pictures['total'] : 0);
                $result['current_page']=get_api_data(isset($pictures['current_page']) ? $pictures['total'] : 0);
                $result['prev_page_url']=get_api_data(isset($pictures['prev_page_url']) ? $pictures['prev_page_url'] : 0);
                $result['next_page_url']=get_api_data(isset($pictures['next_page_url']) ? $pictures['next_page_url'] : 0);
                $result['data']=$pictures['data'];

                if($result['total'] > 0)
                {
                    return response()->json([
                        'result' => $result,
                        'message' => 'Gallery List.',
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
            else
            {
                return response()->json([
                    'success' => false,
                    'message' => 'User does not Exits.',
                    'status'  => 400
                ], 200);
            }

       
    }

    public function upload_images(Request $request)
    {
       dd("ok give scrrenn and give me response example.");
    }
}
