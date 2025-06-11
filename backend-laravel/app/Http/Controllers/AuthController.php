<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Exception;

class AuthController extends Controller
{
 public function redirectToProvider($provider)
{
    $url = Socialite::driver($provider)
        ->stateless()
        ->scopes(['openid', 'email', 'profile'])
        ->redirect()
        ->getTargetUrl();
    Log::info('Google OAuth Redirect URL: ' . $url);
    return response()->json(['url' => $url]);
}
    public function handleProviderCallback($provider)
{
    try {
        Log::info('Handling OAuth callback for provider: ' . $provider);
        $socialUser = Socialite::driver($provider)->stateless()->user();
        Log::info('Social user retrieved: ' . json_encode($socialUser));

        $user = User::updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
            ],
            [
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
            ]
        );
        Log::info('User created/updated: ' . json_encode($user));

        $token = JWTAuth::fromUser($user);
        Log::info('JWT token generated: ' . $token);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    } catch (Exception $e) {
        Log::error('OAuth callback failed: ' . $e->getMessage());
        Log::error('Stack trace: ' . $e->getTraceAsString());
        return response()->json(['error' => 'Authentication failed: ' . $e->getMessage()], 401);
    }
}
}