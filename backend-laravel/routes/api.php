<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppController;

Route::prefix('auth')->group(function () {
    Route::get('{provider}', [AuthController::class, 'redirectToProvider']);
    Route::get('{provider}/callback', [AuthController::class, 'handleProviderCallback']);
});

Route::middleware('auth:api')->group(function () {
    Route::post('apps', [AppController::class, 'store']);
    Route::get('apps', [AppController::class, 'index']);
});