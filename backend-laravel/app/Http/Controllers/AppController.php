<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function store(Request $request)
    {
        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'prompt' => 'required|string',
            'template' => 'required|string',
        ]);

        $app = $user->apps()->create([
            'prompt' => $request->prompt,
            'template' => $request->template,
        ]);

        return response()->json($app, 201);
    }

    public function index()
    {
        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $apps = $user->apps;

        return response()->json($apps);
    }
}