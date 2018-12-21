<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    //
    protected $table = 'notification';
 
    protected $fillable = ['sender_id','receiver_id','message','type','read_at'];

    public function sender()
    {
        return $this->hasOne('App\User', 'id', 'sender_id');
    }

}
