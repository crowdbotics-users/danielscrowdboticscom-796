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
                  
                    'message' => 'Can not send Request your self.',
                    'success' => true,
                    'status' => 400,
                ],200);
            }
            $request_search=Request_data::where('sender_id',$sender->id)->where('receiver_id',$receiver->id)->first();
            if($request_search != null)
            {
                return response()->json([
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
                'message' => 'Success! Request Sent!',
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

    public function request_action(Request $request)
    {
        $receiver= JWTAuth::touser($request->header('authorization'));

        if(isset($request->status) && isset($request->sender_id))
        {
            $sender = User::find($request->sender_id);
            $request_data=Request_data::where('sender_id',$receiver->id)->where('receiver_id',$sender->id)->first();
            $request_data->status=$request->status;
            $request_data->save();

            if($request->status == 1)
            {
                $message = array();
                $title='Request Accepted';
                $msg=$receiver->full_name.' is accepted your request.';
        
                $message['body'] = $msg;
                $message['message'] = $msg;
                $message['title'] = $title;

                $message['target_screen'] = 'request';        
                $message['sender']= make_null($sender);
                $message['receiver']= make_null($receiver);
                $message['notification'] = array("body" => $msg,"title" => $title );
    
                $result=send_notification($sender->fire_base_token,[],$sender->device_type,$message);
                
                $data['title'] = $title;
                $data['message'] =  $msg;
                $data['sender'] = make_null($sender);
                $data['receiver'] = make_null($receiver);
                $data['target_screen'] = 'child';
                $data['response']=$result;                
                $result=(Object)$data;

                return response()->json([
                    'result' => $result,
                    'success' => false,
                    'message' => 'Success.',
                    'status'  => 200
                ], 200);
            }

            $data['sender'] = make_null($sender);
            $data['receiver'] = make_null($receiver);
            $result=(Object)$data;

            return response()->json([
                'result' => $result,
                'success' => false,
                'message' => 'Success.',
                'status'  => 200
            ], 200);

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

    public function send_request_list(Request $request)
    {
        $user=JWTAuth::touser($request->header('authorization'));

        $request_data=User::leftjoin('request','users.id','request.sender_id')->where('request.receiver_id',$user->id)
                       ->where('request.status',0)->paginate(10);

        $request_data=make_null($request_data);
        $result['total']=get_api_data(isset($request_data['total']) ? $request_data['total'] : 0);
        $result['current_page']=get_api_data(isset($request_data['current_page']) ? $request_data['total'] : 0);
        $result['prev_page_url']=get_api_data(isset($request_data['prev_page_url']) ? $request_data['prev_page_url'] : 0);
        $result['next_page_url']=get_api_data(isset($request_data['next_page_url']) ? $request_data['next_page_url'] : 0);
        $result['data']=$request_data['data'];

        if($result['total'] > 0)
        {
            return response()->json([
                'result' => $result,
                'message' => 'Request List.',
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

    public function received_request_list(Request $request)
    {
        $user=JWTAuth::touser($request->header('authorization'));

        $request_data=User::leftjoin('request','users.id','request.receiver_id')->where('request.sender_id',$user->id)
                       ->paginate(10);

        $request_data=make_null($request_data);
        $result['total']=get_api_data(isset($request_data['total']) ? $request_data['total'] : 0);
        $result['current_page']=get_api_data(isset($request_data['current_page']) ? $request_data['total'] : 0);
        $result['prev_page_url']=get_api_data(isset($request_data['prev_page_url']) ? $request_data['prev_page_url'] : 0);
        $result['next_page_url']=get_api_data(isset($request_data['next_page_url']) ? $request_data['next_page_url'] : 0);
        $result['data']=$request_data['data'];

        if($result['total'] > 0)
        {
            return response()->json([
                'result' => $result,
                'message' => 'Request List.',
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
    public function crew_list(Request $request)
    {
        $user=JWTAuth::touser($request->header('authorization'));
        $user_id=isset($request->user_id)?$request->user_id:$user->id;
     

        $crew=Request_data::where(function ($query) use ($user_id){
              $query->where('sender_id', '=', $user_id)
              ->orWhere('receiver_id', '=', $user_id);
               })->where('status',1)->get();

        if(count($crew) > 0)
        {
            $crew=User::whereIn('id',crew_data($crew,$user_id))->paginate(10);   
        }
        else
        {
            return response()->json([
               
                'message' => 'Data Empty.',
                'success' => true,
                'status' => 400,
            ],200);
        }
        

        $crew=make_null($crew);
        
        $result['total']=get_api_data(isset($crew['total']) ? $crew['total'] : 0);
        $result['current_page']=get_api_data(isset($crew['current_page']) ? $crew['total'] : 0);
        $result['prev_page_url']=get_api_data(isset($crew['prev_page_url']) ? $crew['prev_page_url'] : 0);
        $result['next_page_url']=get_api_data(isset($crew['next_page_url']) ? $crew['next_page_url'] : 0);
        $result['data']=$crew['data'];
        
        if($result['total'] > 0)
        {
            return response()->json([
                'result' => $result,
                'message' => 'Request List.',
                'success' => true,
                'status' => 200,
            ],200);
        }
        else
        {
            return response()->json([
             
                'message' => 'Data Empty.',
                'success' => true,
                'status' => 400,
            ],200);
        }
     
    }
    public function mutual_list(Request $request)
    {
        $user=JWTAuth::touser($request->header('authorization'));

        if(isset($request->user_id))
        {
            $profile_user=User::find($request->user_id);
         
            if($profile_user == null)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found.',
                    'status'  => 400
                ], 200);
            }

            $crew=Request_data::where(function ($query) use ($user){
                $query->where('sender_id', '=', $user->id)
                ->orWhere('receiver_id', '=', $user->id);
                })->where('status',1)->get();
            
                if(count($crew) == 0)
                {
                    return response()->json([        
                        'message' => 'Data Empty.',
                        'success' => true,
                        'status' => 400,
                    ],200);
                }

            $crew=crew_data($crew,$user->id);  
                
            $profile_user_crew=Request_data::where(function ($query) use ($profile_user){
                $query->where('sender_id', '=', $profile_user->id)
                ->orWhere('receiver_id', '=', $profile_user->id);
                })->where('status',1)->get();
            
            if(count($profile_user_crew) == 0)
            {
                return response()->json([        
                    'message' => 'Data Empty.',
                    'success' => true,
                    'status' => 400,
                ],200);
            }

            $profile_user_crew=crew_data($profile_user_crew,$profile_user->id);  

            $mutual_friend=User::whereIn('id',$crew)->whereIn('id',$profile_user_crew)->paginate(10);

            $mutual_friend=make_null($mutual_friend);

            $result['total']=get_api_data(isset($mutual_friend['total']) ? $mutual_friend['total'] : 0);
            $result['current_page']=get_api_data(isset($mutual_friend['current_page']) ? $mutual_friend['total'] : 0);
            $result['prev_page_url']=get_api_data(isset($mutual_friend['prev_page_url']) ? $mutual_friend['prev_page_url'] : 0);
            $result['next_page_url']=get_api_data(isset($mutual_friend['next_page_url']) ? $mutual_friend['next_page_url'] : 0);
            $result['data']=$mutual_friend['data'];
            
            if($result['total'] > 0)
            {
                return response()->json([
                    'result' => $result,
                    'message' => 'Request List.',
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
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        }
    }
}
