<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pictures extends Model
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
    protected $table = 'pictures';

    protected $fillable = ['user_id','image_url','status'];

    public function getImageUrlAttribute()
    {
        if($this->attributes['image_url'] && \File::exists(public_path()."/uploads/user/post_images/".$this->attributes['image_url'])){
            $path = url("/")."/"."uploads/user/post_images/";
            return ($this->attributes['image_url'])?$path.$this->attributes['image_url']:'';
        }else{
            return "";
        }	
        
    }
}
