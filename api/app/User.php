<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;

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
}
