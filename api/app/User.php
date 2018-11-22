<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Followers;
use App\Request_data;

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
        'full_name', 'email', 'password','DOB','profile_image','cover_image','role_id','status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $appends = ['follower_count','crew_count','post_count'];


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
		if($this->attributes['profile_image'] && \File::exists(public_path()."/uploads/user/".$this->attributes['profile_image'])){
			$path = url("/")."/"."uploads/user/";
			return ($this->attributes['profile_image'])?$path.$this->attributes['profile_image']:'';
		}else{
			return "";
		}	
        
    }
    public function getCoverImageAttribute()
    {
		if($this->attributes['cover_image'] && \File::exists(public_path()."/uploads/user/cover/".$this->attributes['cover_image'])){
			$path = url("/")."/"."uploads/user/cover/";
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
        $crew_count=Request_data::where('sender_id',$this->attributes['id'])
                        ->orwhere('receiver_id',$this->attributes['id'])
                        ->where('status',1)
                        ->count();
        return $crew_count;
    }

    public function getPostCountAttribute()
    {
        $follower_count=Followers::where('user_id',$this->attributes['id'])->count();
        return $follower_count;
    }
   
    
}
