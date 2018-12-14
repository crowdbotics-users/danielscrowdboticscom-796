<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class Conversation extends Model
{
    //
   
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
    protected $table = 'conversation';

    protected $fillable = ['content','sender_id','receiver_id','image_url','conversation_status'];
   
    public function getImageUrlAttribute()
    {
        if($this->attributes['image_url'] && \File::exists(public_path()."/uploads/user/images/".$this->attributes['image_url']))
        {
            $path = url("/")."/"."uploads/user/images/";
            return ($this->attributes['image_url'])?$path.$this->attributes['image_url']:'';
        }
        else{
            return "";
        }	
        
    }
   
}
