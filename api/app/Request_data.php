<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class Request_data extends Model
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
     protected $table = 'request';
 
     protected $fillable = ['sender_id','receiver_id','status'];

     protected $appends = ['user_details','crew_id'];

     public function getUserDetailsAttribute()
     {
      if(app('request')->header('authorization') != null)
      {
        $user= JWTAuth::touser(app('request')->header('authorization'));
        if(isset($this->attributes['sender_id']) && isset($this->attributes['receiver_id']))
        {
            if($user->id == $this->attributes['sender_id'])
            {
              $user_data=User::find($this->attributes['receiver_id']);
              return $user_data;
            }
            else
            {
              $user_data=User::find($this->attributes['sender_id']);
              return $user_data;
            }
        }
      }
      return "";
     }

   public function getCrewIdAttribute()
     {
      if(app('request')->header('authorization') != null)
      {
       
        $user= JWTAuth::touser(app('request')->header('authorization'));
        if(isset($this->attributes['sender_id']) && isset($this->attributes['receiver_id']))
        {
            if($user->id == $this->attributes['sender_id'])
            {
              return $this->attributes['receiver_id'];
          
            }
            else
            {
              return $this->attributes['sender_id'];
           
            }
        }
      }
      return 0;
     }

     /*public function scopecrew_data($id)
     {
       $crew_data=array();
      if(isset($this->attributes['sender_id']) && isset($this->attributes['receiver_id']))
      {
          if($id == $this->attributes['sender_id'])
          {
            return $this->attributes['receiver_id'];
            //array_push($crew_data,$this->attributes['receiver_id']);
          }
          else
          {
            return $this->attributes['sender_id'];
            //array_push($crew_data,$this->attributes['sender_id']);
          }
          return $crew_data;
      }
      
    }*/

    public function scopecrew_data($id)
     {
       $crew_data=array();
      if(isset($this->attributes['sender_id']) && isset($this->attributes['receiver_id']))
      {
    
          if($id == $this->attributes['sender_id'])
          {
            // /return $this->attributes['receiver_id'];
            array_push($crew_data,$this->attributes['receiver_id']);
          }
          else
          {
            //return $this->attributes['sender_id'];
            array_push($crew_data,$this->attributes['sender_id']);
          }
          return json_encode($crew_data);
      }
      
    }
    
}
