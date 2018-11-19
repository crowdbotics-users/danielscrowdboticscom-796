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
}
