<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pictures;
use App\User;

class GalleryController extends Controller
{
    //

    public function list_images(Request $request)
    {
        if(isset($request->user_id))
        {
            $user=User::find($request->user_id);

            if($user != null)
            {
                $pictures=Pictures::where('user_id',$user_id)->get();
                $result=make_null($pictures);

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
                    'success' => false,
                    'message' => 'User does not Exits.',
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

    public function upload_images(Request $request)
    {
       dd("ok give scrrenn and give me response example.");
    }
}
