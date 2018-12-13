<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Role;
use App\User;
use Hash;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Carbon\Carbon;
use Mail;

class LoginController extends Controller
{
    //

    public function register(Request $request)
    {
        $rules = array(
            'full_name' => 'required|max:50',
            'email' => 'required|email|unique:users',
            'password'=>'required',
            'dob' => 'required|date_format:Y-m-d',
            'profile_image' => 'required',
            'device_type' => 'required',
            'fire_base_token' => 'required',
           
        );
       
        $validator = \Validator::make($request->all(), $rules,[]);

        if ($validator->fails())
        {
            $validation = $validator;
            $status = false;
            $code = 400;
            $msgArr = $validator->messages()->toArray();
            $messages = reset($msgArr)[0];

            return response()->json([
                'message' =>$messages,
                'success' => false,
                'status' => $code],200);
        }

        $user=new User();
        $user->full_name=$request->full_name;
        $user->email=$request->email;
        $user->password=Hash::make($request->password);
        $user->DOB=$request->dob;
        $user->device_type=$request->device_type;
        $user->fire_base_token=$request->fire_base_token;
       
        $user->role_id=1;
        $user->status=1;


        $image=$request->profile_image;
        $imageName = str_replace(' ', '_', $request->full_name).'_'.uniqid(time()) . '.' . $image->getClientOriginalExtension();

        uploadImage($image,'uploads/user/'.$user->id.'/thumbnail',$imageName,'150','150');
        $image_path = uploadImage($image,'uploads/user/'.$user->id.'/',$imageName,'400','400');

        $user->profile_image = $image_path;
        $user->save();

        $email=$user->email;

        Mail::send('emails.welcome', ['user_name' => $user->full_name], function ($message) use ($email)
        {
                $message->subject('Welcome');
                $message->to($email);
        });

        $result=make_null($user);

        return response()->json([
            'result' => $result,
            'message' => 'Registration Successfully Done.',
            'success' => true,
            'status' => 200,
        ],200);
    }

    public function login(Request $request)
    {
    	$rules = array(
            'email' => 'required|email',
            'password'=>'required',
            'device_type' => 'required',
            'fire_base_token' => 'required'
        );

        $validator = \Validator::make($request->all(), $rules, []);

        if ($validator->fails())
        {
            $validation = $validator;
            $status = false;
            $code = 400;
            $msgArr = $validator->messages()->toArray();
            $messages = reset($msgArr)[0];

            return response()->json([
                'message' =>$messages,
                'success' => false,
                'status' => $code],200);
        }

        if(isset($request->email) && isset($request->password))
       	{
           $input = $request->only('email','password');
           $jwt_token = null;
           $user = User::where("email", $request->email)->withTrashed()->first();
      
           if($user)
           {
            if($request->has('fire_base_token')){
                $user->fire_base_token = $request->fire_base_token;
            }
            if($request->has('device_type')){
                $user->device_type = $request->device_type;
            }
            $user->save();

            if (Hash::check($request->password, $user->password))
            {
                if ($user->status == 1 && $jwt_token = JWTAuth::attempt($input))
                {
                    $user = JWTAuth::user();
                    $path = url("/")."/"."uploads/user/";
                    $user->thumb_image = ($user->image)?$path."thumbnail/".$user->image:'';
                    $user->image = ($user->image)?$path.$user->image:'';
                    $result=make_null($user);
                    $result['token']=$jwt_token;

                    return response()->json([
                        'result' => $result,
                        'message' => 'Login Success.',
                        'success' => true,
                        'status' => 200,
                    ]);
                
                }
                else
                {
                    return response()->json([
                        'success' => false,
                        'message' => 'Your account has not activated Yet.',
                        'status'  => 401
                    ], 200);
                }
            }
            else
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid email or password',
                    'status'  => 401
                ], 200);
            }
               
           }
           else
           {
               return response()->json([
                   'success' => false,
                   'message' => 'Invalid email or password',
                   'status'  => 401
               ], 200);
           }
       	}
       	else
      	{
           return response()->json([
               'success' => false,
               'message' => 'Invalid Parameter.',
               'status'  => 400
           ], 200);
        }
    }

    public function logout(Request $request)
    {
        if($request->header('authorization') != null)
        {
            try {
                JWTAuth::invalidate($request->header('authorization'));

                return response()->json([
                    'success' => true,
                    'message' => 'You have successfully logged out!',
                    'status'  => 200
                ], 200);

            } catch (JWTException $exception) {

                return response()->json([
                    'success' => false,
                    'message' => 'Sorry, the user cannot be logged out.',
                    'status'  => 500
                ], RESPONCE_ERROR_CODE);
            }
        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 400);
        } 
    }

    public function forgot_password(Request $request)
    {
        if(isset($request->email))
        {
            $user=User::where('email',$request->email)->where('status',1)->first();
            if($user != null)
            {
                $otp = substr(number_format(time() * rand(),0,'',''),0,4);
                $user->otp = $otp;
                $user->update_otp_date=Carbon::now();
                $user->save();

                $subject = "Thatspoting Reset password !";
				\Mail::send('emails.reset_password', compact('user'), function ($message) use ($user, $subject) {
					$message->to($user->email)->subject($subject);
				});

                $result=make_null($user);

                return response()->json([
                    'result' => $result,
                    'success' => true,
                    'message' => 'One time password has been sent on your Email.',
                    'status'  => 200
                ], 200);
            }
            else
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Your email are not found or you are not actived.',
                    'status'  => 400
                ], 200);
            }
        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        }
    }

    public function get_opt(Request $request)
    {
        if(isset($request->otp) && isset($request->user_id))
        {
            $user_update=User::where('id',$request->user_id)->where("update_otp_date","<",Carbon::now()->subMinutes(15)->format('Y-m-d H:i:s'))->first();
          
            if($user_update != null)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'You otp has been expired.please try again.',
                    'status'  => 400
                ], 200);
            }

           $user=User::find($request->user_id);

           if($user != null)
           {
              
               if($user->otp != $request->otp)
               {
                    return response()->json([
                        'success' => false,
                        'message' => 'otp does not match.',
                        'status'  => 400
                    ], 200);
               }
               else
               {
                    $user->otp = null;
                    $user->save();

                    $result=make_null($user);

                    return response()->json([
                        'result' => $result,
                        'success' => true,
                        'message' => 'otp match Sucessfully.',
                        'status'  => 400
                    ], 200);
               }
           }
           else
           {
            return response()->json([
                'success' => false,
                'message' => 'User not Found.',
                'status'  => 400
            ], 200);
           }


        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        } 
    }
    public function reset_password(Request $request)
    {
        $rules = array(
            'email' => 'required|email',
            'password'=>'required|same:confirm_password',
        );

        $validator = \Validator::make($request->all(), $rules, []);

        if ($validator->fails())
        {
            $validation = $validator;
            $status = false;
            $code = 400;
            $msgArr = $validator->messages()->toArray();
            $messages = reset($msgArr)[0];

            return response()->json([
                'message' =>$messages,
                'success' => false,
                'status' => $code],400);
        }

        $user=User::where('email',$request->email)->first();
            
        if($user)
        {
            $user->password = bcrypt($request->password);
            $user->save();

            $result=make_null($user);
            
            return response()->json([
                'data' => $result,
                'success' => true,
                'message' => 'Success! Your Password has been changed!',
                'status'  => 200
            ], 200);
        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
                'status'  => 400
            ], 200);
        }



    }
    public function post_profile(Request $request)
    {
        if(isset($request->name) && isset($request->post_status))
        {
        
            $user= JWTAuth::touser($request->header('authorization'));
            $user_update=User::where('id',$user->id)->where("update_name_date",">", Carbon::now()->subMonths(6))->first();
            if($user_update != null && $user->full_name != $request->name )
            {
                return response()->json([
                    'success' => false,
                    'message' => 'You have not changed your name.',
                    'status'  => 400
                ], 200);
            }
            else
            {
                if($user->full_name != $request->name)
                {
                   $user_update->full_name=$request->name;
                }
              
                   if($request->hasFile('profile_image') && $request->profile_type='image')
                   {
                       
                        $image=$request->profile_image;
                        $imageName = str_replace(' ', '_', $request->name).'_'.uniqid(time()) . '.' . $image->getClientOriginalExtension();
                
                        uploadImage($image,'uploads/user/'.$user->id.'/thumbnail',$imageName,'150','150');
                        $image_path = uploadImage($image,'uploads/user/'.$user->id.'/',$imageName,'400','400');
                       
                        $user_update->profile_image = $image_path;
                   }
                   else if($request->hasFile('profile_image') && $request->profile_type='gallery')
                   {
                    $user_update->profile_image = $request->profile_image;
                   }

                   if($request->hasFile('cover_image') && $request->cover_type='image')
                   {
                        $image=$request->cover_image;
                        $imageName = str_replace(' ', '_', $request->name).'_'.uniqid(time()) . '.' . $image->getClientOriginalExtension();
                
                        uploadImage($image,'uploads/user/cover/'.$user->id.'/thumbnail',$imageName,'150','150');
                        $image_path = uploadImage($image,'uploads/user/cover/'.$user->id.'/',$imageName,'1200','400');
                
                        $user_update->cover_image = $image_path;
                   }
                   else if($request->hasFile('cover_image') && $request->cover_type='gallery')
                   {
                        $user_update->cover_image = $request->cover_image;
                   }

                    $user_update->post_status=$request->post_status;
                    $user_update->update_name_date=Carbon::now()->format('Y-m-d');
                    $user_update->save();

                    return response()->json([
                        'message' => 'Your Profile Updated Successfully.',
                        'success' => true,
                        'status' => 200,
                    ],200);

                }
            }

        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Parameter.',
                'status'  => 400
            ], 200);
        }
    }

    public function edit_profile(Request $request)
    {
      
            $user= JWTAuth::touser($request->header('authorization'));
            $result=make_null($user);

            return response()->json([
                'result' => $result,
                'message' => 'User Profile.',
                'success' => true,
                'status' => 200,
            ],200);

    }

    
}
