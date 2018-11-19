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
?>