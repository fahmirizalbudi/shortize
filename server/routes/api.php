<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

   Route::prefix('auth')->group(function () {
       Route::post('register', [AuthController::class, 'register']);
       Route::post('login', [AuthController::class, 'login']);
       Route::get('me', [AuthController::class, 'me'])->middleware('auth:sanctum');
       Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
   });

   Route::get('urls/{url}/go', [UrlController::class, 'go']);

   Route::middleware('auth:sanctum')->group(function () {
       Route::apiResource('users', UserController::class)->middleware('authorize:admin');
       Route::prefix('urls')->group(function () {
           Route::get('/', [UrlController::class, 'index'])->middleware('authorize:admin');
           Route::post('/', [UrlController::class, 'store']);
           Route::get('user', [UrlController::class, 'user']);
           Route::get('exists', [UrlController::class, 'exists']);
           Route::get('{url}', [UrlController::class, 'show']);
           Route::put('{url}', [UrlController::class, 'update']);
           Route::delete('{url}', [UrlController::class, 'destroy']);
       });
   });

});
