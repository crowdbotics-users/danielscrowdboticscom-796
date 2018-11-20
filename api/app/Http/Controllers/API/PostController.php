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
            else if(isset($request->post_image))
            {
                $image=$request->profile_image;
                $imageName = str_replace(' ', '_', $request->full_name).'_'.uniqid(time()) . '.' . $image->getClientOriginalExtension();
    
                uploadImage($image,'uploads/user/'.$user->id.'/post_images/thumbnail',$imageName,'150','150');
                $image_path = uploadImage($image,'uploads/user/'.$user->id.'/post_images',$imageName,'400','400');
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

                return response()->json([
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
        if(isset($request->post_id) && isset($request->parent_id) && isset($request->type) && isset($request->messages))
        {
              
            $comment=new CommentsLikes();
            $comment->type=$request->type;
            $comment->user_id=$user->id;
            $comment->messages=$request->messages;
            $comment->post_id=$request->post_id;
            $comment->parent_id=$request->parent_id;
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

    public function list(Request $request)
    {
        $post=Post::where('status',1)->pagination(10);
        

    }
}
