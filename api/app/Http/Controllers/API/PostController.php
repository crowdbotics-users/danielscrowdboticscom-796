<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;
use App\User;
use App\CommentsLikes;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;

class PostController extends Controller
{
    //
    public function list(Request $request)
    {
        $post=Post::with('users')->where('status',1)->paginate(10);

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
        if(isset($request->description) || isset($request->post_image))
        {
            $post=new Post();
            if(isset($request->description))
            {
                $post->description=$request->description;
            }
            if(isset($request->post_image))
            {
               ;
                $image=$request->post_image;
                $imageName = str_replace(' ', '_', $request->full_name).'_'.uniqid(time()) . '.' . $image->getClientOriginalExtension();
    
                uploadImage($image,'uploads/user/post_images/thumbnail',$imageName,'150','150');
                $image_path = uploadImage($image,'uploads/user/post_images',$imageName,'400','400');
                $post->post_image = $image_path;
                
                
            }
            $post->user_id=$user->id;
            $post->status = 1;
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

    public function view_all_message(Request $request)
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
}
