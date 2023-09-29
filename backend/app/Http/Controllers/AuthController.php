<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Requests\AuthRequest;

class AuthController extends Controller
{
      public function __construct()
      {
      $this->middleware('auth:api', ['except' => ['login' , 'register']]);
      }

      public function register(Request $request)
      {
        $validate = $request->validate([
        'name' => 'required|alpha',
        'email' => 'required|email',
        'password' => 'required'
        ]); 
        if ($validate == true) {
              $user = User::create([
              'name' => $request->name,
              'email' => $request->email,
              'password' => Hash::make($request->password),
              ]);
              return response()->json(['message' => 'You Registered Successfully!'
            , 'user'=> $user],201);
        }     
        else{
              return response()->json(['error' => 'There is Something Wrong!!']);
        }

      }

      public function login(AuthRequest $request)
      {
            
      $credentials = request(['email', 'password']);
         $request->validated($credentials);

      if (! $token = auth()->attempt($credentials)) {
      return response()->json(['error' => 'Unauthorized'], 401);
      }

      else{
      return $this->respondWithToken($token);
      }
      }

      /**
      * Get the authenticated User.
      *
      * @return \Illuminate\Http\JsonResponse
      */
      public function me()
      {
      return response()->json(auth()->user());
      }

      /**
      * Log the user out (Invalidate the token).
      *
      * @return \Illuminate\Http\JsonResponse
      */
      public function logout()
      {
      auth()->logout();

      return response()->json(['message' => 'Successfully logged out']);
      }

      /**
      * Refresh a token.
      *
      * @return \Illuminate\Http\JsonResponse
      */
      public function refresh()
      {
      return $this->respondWithToken(auth()->refresh());
      }

      /**
      * Get the token array structure.
      *
      * @param string $token
      *
      * @return \Illuminate\Http\JsonResponse
      */
      protected function respondWithToken($token)
      {
      return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 1,
      'user' => auth()->user()
      ]);
      }
}
