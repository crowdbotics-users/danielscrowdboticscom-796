<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Hash;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Notification;

class NotificationController extends Controller
{
    //

    public function get_list(Request $request)
    {
        $user= JWTAuth::touser($request->header('authorization'));
        
        $notification=Notification::with('sender')->where('receiver_id',$user->id)->where('read_at',0)->paginate(10);
        
        $notification=make_null($notification);
        $result['total']=get_api_data(isset($notification['total']) ? $notification['total'] : 0);
        $result['current_page']=get_api_data(isset($notification['current_page']) ? $notification['total'] : 0);
        $result['prev_page_url']=get_api_data(isset($notification['prev_page_url']) ? $notification['prev_page_url'] : 0);
        $result['next_page_url']=get_api_data(isset($notification['next_page_url']) ? $notification['next_page_url'] : 0);
        $result['data']=$notification['data'];

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

    public function update_notification(Request $request)
    {   
        if(isset($request->notification_id))
        {
            $notification=Notification::whereId($request->notification_id)->first();
            if($notification != null)
            {
                $notification->read_at=1;
                $notification->save();
                return response()->json([
                    'message' => 'Success',
                    'success' => true,
                    'status' => 200,],200);
            }
            else{
                return response()->json([
                    'result' => (Object)[],
                    'message' => 'Notification not found!',
                    'success' => false,
                    'status' => 400,
                ],200); 
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
