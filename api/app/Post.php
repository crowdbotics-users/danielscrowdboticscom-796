<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\CommentsLikes;

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
     protected $appends = ['likes_count','comment_count'];

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
}
