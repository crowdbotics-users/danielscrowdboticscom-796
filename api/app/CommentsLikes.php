<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CommentsLikes extends Model
{
    use SoftDeletes;
    //
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
    protected $table = 'comments_likes';

    protected $fillable = ['messages','type','user_id','post_id','parent_id','status'];

    protected $appends = ['reply_count','comment_like_count'];

    public function getReplyCountAttribute()
    {
        return $this->reply()->count();
    }
    public function reply()
    {
        return $this->hasMany('App\CommentsLikes', 'parent_id', 'id')->where('type','reply');
    }

    public function users()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
    public function getCommentLikeCountAttribute()
    {
        return $this->hasMany('App\CommentsLikes', 'parent_id', 'id')->where('type','comment-like')->count();
    }
}
