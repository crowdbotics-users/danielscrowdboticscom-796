<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Conversation;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Request_data;
use App\User;

class ConversationController extends Controller
{
    //
    public function search(Request $request)
    {
        if(isset($request->search_data))
        {
            $user=JWTAuth::touser($request->header('authorization'));
       
            $crew=Request_data::where(function ($query) use ($user){
                  $query->where('sender_id', '=', $user->id)
                  ->orWhere('receiver_id', '=', $user->id);
                   })->where('status',1)->get();
    
            if(count($crew) > 0)
            {
                $crew=User::where('full_name','LIKE',"%$request->search_data%")->whereIn('id',crew_data($crew,$user->id))->paginate(10);   
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
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        }
    }

    public function store(Request $request)
    {
        $user= JWTAuth::touser($request->header('authorization'));
        if((isset($request->content) || isset($request->conversation_image)) && isset($request->receiver_id))
        {
            $conversation=new Conversation();
            
            if(isset($request->content))
            {
                $conversation->content=$request->content;
            }
            $conversation->image_url="";
            if(isset($request->conversation_image))
            {
                $image=$request->conversation_image;
                $imageName = str_replace(' ', '_', $user->full_name).'_'.uniqid(time()) . '.' . $image->getClientOriginalExtension();
    
                uploadImage($image,'uploads/user/images/thumbnail',$imageName,'150','150');
                $image_path = uploadImage($image,'uploads/user/images',$imageName,'400','400');
                $conversation->image_url = $image_path;
                 
            }
            $conversation->sender_id=$user->id;
            $conversation->receiver_id=$request->receiver_id;
            $conversation->conversation_status = "sending";
            $conversation->save();

            $result=make_null($conversation);

            return response()->json([
                'result' => $result,
                'message' => 'Conversation send Successfully.',
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
    
    public function list(Request $request)
    {
        $user=JWTAuth::touser($request->header('authorization'));

        $conversation_list=User::leftjoin('conversation','users.id','conversation.sender_id')
                            ->where('conversation.receiver_id',$user->id)
                            ->select('users.*','conversation.content','conversation.image_url')
                            ->groupby('users.id')->paginate(10);

        $conversation_list=make_null($conversation_list);
       
        $result['total']=get_api_data(isset($conversation_list['total']) ? $conversation_list['total'] : 0);
        $result['current_page']=get_api_data(isset($conversation_list['current_page']) ? $conversation_list['total'] : 0);
        $result['prev_page_url']=get_api_data(isset($conversation_list['prev_page_url']) ? $conversation_list['prev_page_url'] : 0);
        $result['next_page_url']=get_api_data(isset($conversation_list['next_page_url']) ? $conversation_list['next_page_url'] : 0);
        $result['data']=$conversation_list['data'];

        if($result['total'] > 0)
        {
            return response()->json([
                'result' => $result,
                'message' => 'conversation List.',
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

    public function message_list(Request $request)
    {
        if(isset($request->user_id))
        {
            $user=JWTAuth::touser($request->header('authorization'));

            $conversation_list=Conversation::where(function ($query) use($user,$request){
                                $query->where('sender_id', '=', $request->user_id)
                                ->where('receiver_id', '=', $user->id);
                            })->orWhere(function ($query) use ($user,$request){
                                $query->where('sender_id', '=', $user->id)
                            ->where('receiver_id', '=', $request->user_id);
                            })->orderby('created_at','DESC')->paginate(10);
                           
            $conversation_list=make_null($conversation_list);

            $result['total']=get_api_data(isset($conversation_list['total']) ? $conversation_list['total'] : 0);
            $result['current_page']=get_api_data(isset($conversation_list['current_page']) ? $conversation_list['total'] : 0);
            $result['prev_page_url']=get_api_data(isset($conversation_list['prev_page_url']) ? $conversation_list['prev_page_url'] : 0);
            $result['next_page_url']=get_api_data(isset($conversation_list['next_page_url']) ? $conversation_list['next_page_url'] : 0);
            $result['data']=$conversation_list['data'];
    
            if($result['total'] > 0)
            {
                return response()->json([
                    'result' => $result,
                    'message' => 'conversation List.',
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

    public function status_change(Request $request)
    {
        if(isset($request->conversation_id) && isset($request->status))
        {
            if($request->status != "sending" && $request->status != "delivered" && $request->status != "read")
            {
                return response()->json([
                    'message' => 'Enter a Valid type.',
                    'success' => true,
                    'status' => 400,
                ],200);
            }

            $conversation_list=Conversation::find($request->conversation_id);

            if($conversation_list == null)
            {
                return response()->json([
                  
                    'message' => 'enter a valid Conversation list',
                    'success' => true,
                    'status' => 400,
                ],200);
            }

            $conversation_list->conversation_status=$request->status;
            $conversation_list->save();

            return response()->json([
               
                'message' => 'Suceesfully Change',
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
