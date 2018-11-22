<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Request_data;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;

class RequestController extends Controller
{
    //
    public function send_request(Request $request)
    {
        $sender= JWTAuth::touser($request->header('authorization'));

        if(isset($request->receiver_id))
        {
            $receiver=User::find($request->receiver_id);

            if($sender->id == $receiver->id)
            {
                return response()->json([
                    'result' => $result,
                    'message' => 'Can not send Request your self.',
                    'success' => true,
                    'status' => 400,
                ],200);
            }
            $request_search=Request_data::where('sender_id',$sender->id)->where('receiver_id',$receiver->id)->first();
            if($request_search != null)
            {
                return response()->json([
                    'result' => $result,
                    'message' => 'You have already send request.',
                    'success' => true,
                    'status' => 400,
                ],200);
            }
            $request_data = new Request_data();
            $request_data->sender_id = $sender->id;
            $request_data->receiver_id = $request->receiver_id;
            $request_data->status = 0;
            $request_data->save(); 

            $message = array();
            $title=$sender->full_name;
            $msg="Request from ".$sender->full_name;
    
            $message['body'] = $msg;
            $message['message'] = $msg;
            $message['title'] = $title;
            $message['target_screen'] = 'request';
    
            $message['sender']= make_null($sender);
            $message['receiver']= make_null($receiver);
            $message['notification'] = array(
                "body" => $msg,
                "title" => $title
             
            );

            $result=send_notification($receiver->fire_base_token,[],$receiver->device_type,$message);
            
            $data['title'] = 'Request send from '.$sender->full_name;
            $data['message'] = 'Request send to '.$receiver->full_name;
            $data['sender'] = make_null($sender);
            $data['receiver'] = make_null($receiver);
            $data['target_screen'] = 'child';
            $data['response']=$result;
      
            
        $result=(Object)$data;

        return response()->json([
            'result' => $result,
            'message' => 'Success! Badge Request Sent!',
            'success' => true,
            'status' => 200,
        ],200);
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
