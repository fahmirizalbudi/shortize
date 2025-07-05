<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

   Route::prefix('auth')->group(function () {
       Route::post('register', [AuthController::class, 'register']);
       Route::post('login', [AuthController::class, 'login']);
       Route::get('me', [AuthController::class, 'me'])->middleware('auth:sanctum');
       Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
   });

   Route::middleware('auth:sanctum')->group(function () {
       Route::apiResource('users', UserController::class);
       Route::prefix('urls')->group(function () {
           Route::apiResource('/', UserController::class);
       });
   });

});
