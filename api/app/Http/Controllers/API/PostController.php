<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;
use App\User;
use App\CommentsLikes;
use App\Pictures;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;
use App\Request_data;
use App\Notification;

class PostController extends Controller
{
    //
    public function list(Request $request)
    {
        $user= JWTAuth::touser($request->header('authorization'));
        
        $post=Post::with('users')->where('user_id','!=',$user->id)->where('post_status','all');
        
            $crew=Request_data::where(function ($query) use ($user){
                    $query->where('sender_id', '=', $user->id)
                    ->orWhere('receiver_id', '=', $user->id);
                    })->where('status',1)->get();
            
                if(count($crew) > 0)
                {
                    $crew=crew_data($crew,$user->id);  
                    $post=$post->whereIn('user_id',$crew);
                }

            $post=$post->where('status',1)->orderby('created_at','DESC')->paginate(10);
        
            $post=make_null($post);

            $result['total']=get_api_data(isset($post['total']) ? $post['total'] : 0);
            $result['current_page']=get_api_data(isset($post['current_page']) ? $post['total'] : 0);
            $result['prev_page_url']=get_api_data(isset($post['prev_page_url']) ? $post['prev_page_url'] : 0);
            $result['next_page_url']=get_api_data(isset($post['next_page_url']) ? $post['next_page_url'] : 0);
            $result['data']=$post['data'];

            if($result['total'] > 0)
            {
                return response()->json([
                    'result' => $result,
                    'message' => 'Post Data.',
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

    public function store(Request $request)
    {
       
        $user= JWTAuth::touser($request->header('authorization'));
        if((isset($request->description) || isset($request->post_image)) && isset($request->post_status))
        {
            $post=new Post();
            
            if(isset($request->description))
            {
                $post->description=$request->description;
            }
            if(isset($request->post_image))
            {
                $image=$request->post_image;
                $imageName = str_replace(' ', '_', $request->full_name).'_'.uniqid(time()) . '.' . $image->getClientOriginalExtension();
    
                uploadImage($image,'uploads/user/post_images/thumbnail',$imageName,'150','150');
                $image_path = uploadImage($image,'uploads/user/post_images',$imageName,'400','400');
                $post->post_image = $image_path;
                
                $pictures=new Pictures();
                $pictures->user_id=$user->id;
                $pictures->image_url=$image_path;
                $pictures->status=1;
                $pictures->save();

                 
            }
            $post->user_id=$user->id;
            $post->status = 1;
            $post->post_status = $request->post_status;
            $post->save();

            $result=make_null($post);

            return response()->json([
                'result' => $result,
                'message' => 'Post Upload Successfully.',
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

    public function add_like(Request $request)
    {
        $user= JWTAuth::touser($request->header('authorization'));
        if(isset($request->post_id))
        {
            $post=Post::find($request->post_id);
            if($post == null)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Post Id not found.',
                    'status'  => 400
                ], 200);
            }
            $likes_data=CommentsLikes::where('user_id',$user->id)->where('post_id',$request->post_id)->first();
            if($likes_data != null)
            {
                $likes_data->delete();
                $post=Post::find($request->post_id);
                $result=make_null($post);

                return response()->json([
                    'result' => $result,
                    'message' => 'Success.',
                    'success' => true,
                    'status' => 200,
                ],200);
            }

            $likes=new CommentsLikes();
            $likes->type='like';
            $likes->user_id=$user->id;
            $likes->post_id=$request->post_id;
            $likes->status=1;
            $likes->save();

            $post=Post::find($request->post_id);
            $result=make_null($post);

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
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        }
    }

    public function add_comment(Request $request)
    {
        $user= JWTAuth::touser($request->header('authorization'));
        if(isset($request->post_id) && isset($request->comment_id) && isset($request->type) && isset($request->messages))
        {
            
            $post=Post::find($request->post_id);
            if($post == null)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Post Id not found.',
                    'status'  => 400
                ], 200);
            }

            $comment=new CommentsLikes();
            $comment->type=$request->type;
            $comment->user_id=$user->id;
            $comment->messages=$request->messages;
            $comment->post_id=$request->post_id;
            $comment->parent_id=$request->comment_id;
            $comment->status=1;
            $comment->save();

            $post=Post::find($request->post_id);
            $result=make_null($post);

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
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        }
    }

    public function add_comment__like(Request $request)
    {
        $user= JWTAuth::touser($request->header('authorization'));
        
        if(isset($request->post_id) && isset($request->comment_id))
        {
            $post=Post::find($request->post_id);
            if($post == null)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Post Id not found.',
                    'status'  => 400
                ], 200);
            }
            
            $comment_likes_data=CommentsLikes::where('user_id',$user->id)->where('post_id',$request->post_id)
                        ->where('parent_id',$request->comment_id)->first();

            if($comment_likes_data != null)
            {
                $comment_likes_data->delete();
                $comment_likes=CommentsLikes::find($request->comment_id);
                $result=make_null($comment_likes);

                return response()->json([
                    'result' => $result,
                    'message' => 'Success.',
                    'success' => true,
                    'status' => 200,
                ],200);
            }

            $comment_like=new CommentsLikes();
            $comment_like->type='comment-like';
            $comment_like->user_id=$user->id;
            $comment_like->post_id=$request->post_id;
            $comment_like->parent_id=$request->comment_id;
            $comment_like->status=1;
            $comment_like->save();

            $comment_likes=CommentsLikes::find($request->comment_id);
            $result=make_null($comment_likes);

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
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        }
    }

    public function view_comment_all_message(Request $request)
    {
        if(isset($request->post_id))
        {
            $comments=CommentsLikes::with('users')->where('status',1)
              ->where('type','comment')->where('parent_id',0)->where('post_id',$request->post_id)->paginate(10);

            $comments=make_null($comments);
            $result['total']=get_api_data(isset($comments['total']) ? $comments['total'] : 0);
            $result['current_page']=get_api_data(isset($comments['current_page']) ? $comments['total'] : 0);
            $result['prev_page_url']=get_api_data(isset($comments['prev_page_url']) ? $comments['prev_page_url'] : 0);
            $result['next_page_url']=get_api_data(isset($comments['next_page_url']) ? $comments['next_page_url'] : 0);
            $result['data']=$comments['data'];

            if($result['total'] > 0)
            {
                return response()->json([
                    'result' => $result,
                    'message' => 'Comments Data.',
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

    public function view_reply_all_message(Request $request)
    {
        if(isset($request->post_id) && isset($request->parent_id))
        {
            $comments=CommentsLikes::with('users')->where('status',1)
                    ->where('type','reply')->where('parent_id',$request->parent_id)
                    ->where('post_id',$request->post_id)
                    ->paginate(10);
                    
            $comments=make_null($comments);
            $result['total']=get_api_data(isset($comments['total']) ? $comments['total'] : 0);
            $result['current_page']=get_api_data(isset($comments['current_page']) ? $comments['total'] : 0);
            $result['prev_page_url']=get_api_data(isset($comments['prev_page_url']) ? $comments['prev_page_url'] : 0);
            $result['next_page_url']=get_api_data(isset($comments['next_page_url']) ? $comments['next_page_url'] : 0);
            $result['data']=$comments['data'];

            if($result['total'] > 0)
            {
                return response()->json([
                    'result' => $result,
                    'message' => 'Comments Data.',
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

    public function my_post_list(Request $request)
    {
        $user = JWTAuth::touser($request->header('authorization'));
        $user_id = isset($request->user_id)?$request->user_id:$user->id;
        $user = User::find($user_id);
        if($user == null)
        {
             return response()->json([
                    'success' => false,
                    'message' => 'User does not Exits.',
                    'status'  => 400
                ], 200);
        } 

        $post=Post::with('users')->where('user_id',$user_id)->where('status',1)->orderby('created_at','DESC')->paginate(10);

        $post=make_null($post);
        $result['total']=get_api_data(isset($post['total']) ? $post['total'] : 0);
        $result['current_page']=get_api_data(isset($post['current_page']) ? $post['total'] : 0);
        $result['prev_page_url']=get_api_data(isset($post['prev_page_url']) ? $post['prev_page_url'] : 0);
        $result['next_page_url']=get_api_data(isset($post['next_page_url']) ? $post['next_page_url'] : 0);
        $result['data']=$post['data'];

        if($result['total'] > 0)
        {
            return response()->json([
                'result' => $result,
                'message' => 'Post Data.',
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
