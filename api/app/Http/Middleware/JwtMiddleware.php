<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        }
        catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Token is Invalid',
                    'status'  => 401
                ], 200);
            }
            else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'Token is Expired',
                    'status'  => 401
                ], 200);
            }
            else {

                return response()->json([
                    'success' => false,
                    'message' => 'Authorization Token not found',
                    'status'  => 401
                ], 200);
            }
        }
        return $next($request);
    }
}
