<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

  public function login(Request $request)
{
    // Validate request data
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    $credentials = $request->only('email', 'password');

    // Log login attempt
    Log::info('Login attempt', ['email' => $credentials['email']]);

    try {
        // Try to generate token using credentials
        if (!$token = JWTAuth::attempt($credentials)) {
            Log::warning('Login failed: Invalid credentials', ['email' => $credentials['email']]);
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Set token and retrieve user
        JWTAuth::setToken($token);
        $user = JWTAuth::user();

        if (!$user) {
            Log::error('Token generated but user not found', ['email' => $credentials['email']]);
            return response()->json(['error' => 'User not found'], 404);
        }

        Log::info('Login successful', ['user_id' => $user->id]);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);

    } catch (JWTException $e) {
        Log::error('JWT Error during login', ['message' => $e->getMessage()]);
        return response()->json(['error' => 'Could not create token'], 500);
    }
}
}