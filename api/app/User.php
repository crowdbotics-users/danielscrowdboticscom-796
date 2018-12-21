<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Followers;
use App\Request_data;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Conversation;
use App\Notification;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'full_name', 'email', 'password','DOB','profile_image','cover_image','role_id','status','otp','update_name_date','update_otp_date'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $appends = ['follower_count','crew_count','post_count','friend_status','conversation_count',
    'follow_status','notification_count'];

    public function getJWTIdentifier()
    {
        return $this->getKey(); 
    }
    
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function hasRole($role)
    {
        return $this->roles()->get()->contains('label',$role);
    }

    public function getProfileImageAttribute()
    {
		if($this->attributes['profile_image'] && \File::exists(public_path()."/uploads/user/".$this->attributes['id']."/".$this->attributes['profile_image'])){
			$path = url("/")."/"."uploads/user/".$this->attributes['id']."/";
			return ($this->attributes['profile_image'])?$path.$this->attributes['profile_image']:'';
		}else{
			return "";
		}	
        
    }
    public function getCoverImageAttribute()
    {
		if($this->attributes['cover_image'] && \File::exists(public_path()."/uploads/user/cover/".$this->attributes['id']."/".$this->attributes['cover_image'])){
			$path = url("/")."/"."uploads/user/cover/".$this->attributes['id']."/";
			return ($this->attributes['cover_image'])?$path.$this->attributes['cover_image']:'';
		}else{
			return "";
		}	
        
    }

    public function getFollowerCountAttribute()
    {
        $follower_count=Followers::where('user_id',$this->attributes['id'])->count();
        return $follower_count;
    }

    public function getCrewCountAttribute()
    {
        $crew_count=Request_data::
                    where(function ($query) {
                        $query->where('sender_id', '=', $this->attributes['id'])
                        ->orWhere('receiver_id', '=', $this->attributes['id']);
                        })
                        ->where('status',1)
                        ->count();
        return $crew_count;
    }

    public function getPostCountAttribute()
    {
        $follower_count=Followers::where('user_id',$this->attributes['id'])->count();
        return $follower_count;
    }

    public function getNotificationCountAttribute()
    {
        $notification_count=Notification::where('receiver_id',$this->attributes['id'])
                        ->where('read_at',0)->count();
        return $notification_count;
    }

    public function getFriendStatusAttribute()
    {
        if(app('request')->header('authorization') != null)
        {
            $user= JWTAuth::touser(app('request')->header('authorization'));
            $crew=Request_data::where(function ($query) {
                            $query->where('sender_id', '=', $this->attributes['id'])
                            ->orWhere('receiver_id', '=', $this->attributes['id']);
                        })->where(function ($query) use ($user){
                            $query->where('sender_id', '=', $user->id)
                           ->orWhere('receiver_id', '=', $user->id);
                           })->first();
            if($crew != null)
            {
                if($crew->status == 0)
                {
                    return "pending";
                }
                else if($crew->status == 1)
                {
                    return "accept";
                }
                else if($crew->status == 2)
                {
                    return "cancel";
                }
                else if($crew->status == 3)
                {
                    return "reject";
                }
            }
            else
            {
                return "";
            }
        }
        
        return "";
           
      
    }
    public function getConversationCountAttribute()
    {
        if(app('request')->header('authorization') != null)
        {

            $user= JWTAuth::touser(app('request')->header('authorization'));
        
            $unread_count=Conversation::
                     where('receiver_id',$user->id)
                    ->where('conversation_status','delivered')
                    ->count();
                    
            return $unread_count;
           
   
        }
    }
    public function getFollowStatusAttribute()
    {
        if(app('request')->header('authorization') != null)
        {

            $user= JWTAuth::touser(app('request')->header('authorization'));
        
            $follow_status=Followers::where('user_id',$this->attributes['id'])
                            ->where('follower_id',$user->id)
                            ->where('status',1)->count();

            if($follow_status > 0)
            {
                return true;
            }
                    
            return false;;
           
   
        }
    }
   
  
    
}
