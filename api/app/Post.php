<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\CommentsLikes;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class Post extends Model
{
     use SoftDeletes;
    
      /**
      * Indicates if the model should be timestamped.
      *
      * @var bool
      */
     // public $timestamps = false;
 
     /**
      * The database table used by the model.
      *
      * @var string
      */
     protected $table = 'post';
 
     protected $fillable = ['description','user_id','status'];
     protected $appends = ['likes_count','comment_count','is_like'];

    public function users()
    {
        return $this->hasMany('App\User', 'id', 'user_id');
    }

     public function getLikesCountAttribute()
     {
         $likes_count=CommentsLikes::where('post_id',$this->attributes['id'])->where('type','like')->count();
         return $likes_count;
     }
     public function getCommentCountAttribute()
     {
         $comment_count=CommentsLikes::where('type','reply')->orwhere('type','comment')->where('post_id',$this->attributes['id'])->count();
         return $comment_count;
     }

     public function getIsLikeAttribute()
     {  
        $user_follower= JWTAuth::touser(app('request')->header('authorization'));
        $is_like=CommentsLikes::where('post_id',$this->attributes['id'])
                  ->where('user_id',$user_follower->id)
                  ->where('status',1)
                  ->where('type','like')->count();
        
        if($is_like > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
     }

}
