<?php

    function make_null($value){
        $value = $value->toArray();
        array_walk_recursive($value, function (&$item, $key) {
            $item =  $item === null ? "" : $item;
        });
        return $value;
    }

    function uploadImage($image, $path, $imageName ,$height , $width )
    {
        $image = Image::make($image->getRealPath());
        
        $path = public_path() .'/'. $path;
        
        File::exists($path) or mkdir($path, 0777, true);
        
        $image->fit($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            })->save($path.'/'.$imageName);

        return $imageName;
    }
    function get_api_data($data)
    {
        if($data != null)
        {
            return $data;
        }
        else
        {
            return "";
        }
    }
    function send_notification($to,$notification,$device_type,$message)
    {
      
        if($device_type == 'android')
        {
     
            // Set POST variables
            $url = 'https://fcm.googleapis.com/fcm/send';
            $FIREBASE_KEY = 'AIzaSyANziEtvy6ASzwMC6H-IHfv7TxucI2TrHw';

            $field = array(
		
				"to" => $to,
				"collapse_key" => "type_a",
				"notification" => $message['notification'],
				//"data" => $message
			);

           // echo "<pre>"; echo json_encode($field); exit;

            $headers = array(
                'Authorization: key=' . $FIREBASE_KEY,
                'Content-Type: application/json'
            );
            //Initializing curl to open a connection
            $ch = curl_init();

            //Setting the curl url
            curl_setopt($ch, CURLOPT_URL, $url);
            
            //setting the method as post
            curl_setopt($ch, CURLOPT_POST, true);

            //adding headers 
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            //disabling ssl support
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            
            //adding the fields in json format 
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($field));

            //finally executing the curl request 
            $result = curl_exec($ch);
            if ($result === false) {
                die('Curl failed: ' . curl_error($ch));
            }

            //Now close the connection
            curl_close($ch);
            
            //and return the result 
            return $result;

          
          
        }
        elseif($device_type == 'ios')
        {  
            /*Notification Code*/
          
           
            $deviceid = $to;
            $certificate_path = $_SERVER['DOCUMENT_ROOT'].'/dev/laravel/mysafety/public/MySafety.pem';
           
          
            $app_is_live = 0;
            $tHost = 'gateway.sandbox.push.apple.com';

            $tPort = 2195;

            // Provide the Certificate and Key Data.

            $tCert = $certificate_path;

            // Provide the Private Key Passphrase (alternatively you can keep this secrete

            // and enter the key manually on the terminal -> remove relevant line from code).

            // Replace XXXXX with your Passphrase

            $tPassphrase = 'xxxxxx';

            // Provide the Device Identifier (Ensure that the Identifier does not have spaces in it).

            // Replace this token with the token of the iOS device that is to receive the notification.

            $tToken = $deviceid;

            // The message that is to appear on the dialog.
            $tAlert = $message['message'];
            $tscreen = $message['target_screen'];
            $tsender_name = $message['sender']['full_name'];
            $tsender_image = $message['sender']['profile_image'];
          
            $treceiver_name = $message['receiver']['full_name'];
            $treceiver_image = $message['receiver']['profile_image'];
          
           
            

            // The Badge Number for the Application Icon (integer >=0).

            $tBadge = 1;

            // Audible Notification Option.

            $tSound = 'default';

            // The content that is returned by the LiveCode "pushNotificationReceived" message.

            $tPayload = '{"endereco":"lauro oscar diefenthaeler","tel":"51 3561-8797","numero":"243","complemento":"0","id":"9","nome":"petiskeira","msg":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum."}';

            // Create the message content that is to be sent to the device.

            $tBody['aps'] = array (

                'alert' => $tAlert,
                'badge' => $tBadge,
                'sound' => $tSound,
                'tagert_screen' => $tscreen,
                'sender_image' => $tsender_image,
               
                'sender_name' => $tsender_name,
                'receiver_name' => $treceiver_name,
                'receiver_image' => $treceiver_image,
               

            );

            $tBody ['payload'] = $tPayload;
            $tBody = json_encode ($tBody);
           
            // Create the Socket Stream.

            $tContext = stream_context_create ();

            stream_context_set_option ($tContext, 'ssl', 'local_cert', $tCert);

            // Remove this line if you would like to enter the Private Key Passphrase manually.

            stream_context_set_option ($tContext, 'ssl', 'passphrase', $tPassphrase);
			//return 'Ok';
            if ($app_is_live == '1') {
            $tHost = "gateway.push.apple.com";
            } else {
            $tHost = "gateway.sandbox.push.apple.com";
            }
            // Open the Connection to the APNS Server.

            $tSocket = stream_socket_client ('ssl://'.$tHost.':'.$tPort, $error, $errstr, 30, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $tContext);

            // Check if we were able to open a socket.

            if (!$tSocket)

            exit ("APNS Connection Failed: $error $errstr" . PHP_EOL);

            // Build the Binary Notification.

            $tMsg = chr (0) . chr (0) . chr (32) . pack ('H*', $tToken) . pack ('n', strlen ($tBody)) . $tBody;

            // Send the Notification to the Server.

            $tResult = fwrite ($tSocket, $tMsg, strlen ($tMsg));
		
            if ($tResult){

            $data_response = 'Delivered Message to APNS' . PHP_EOL;

            }else

            $data_response = 'Could not Deliver Message to APNS' . PHP_EOL;

            // Close the Connection to the Server.

            fclose ($tSocket);
            return  $data_response;

           
        }
    }

?>