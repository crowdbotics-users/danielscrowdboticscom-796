<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Role extends Model
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
     protected $table = 'role';
 
     protected $fillable = ['name','label'];
}
