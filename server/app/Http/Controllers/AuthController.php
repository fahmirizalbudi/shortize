<?php

namespace App\Http\Controllers;

use App\Helpers\JSONFormatter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        if ($validator->fails()) {
            return JSONFormatter::format(422, 'Validation Failed', $validator->errors());
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => 2
        ]);

        return JSONFormatter::format(200, 'User registered successfully');
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return JSONFormatter::format(422, 'Validation Failed', $validator->errors());
        }

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return JSONFormatter::format(422, 'Invalid credentials');
        }

        $token = $user->createToken('token')->plainTextToken;

        return JSONFormatter::format(200, 'Login successful', ['token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return JSONFormatter::format(200, 'Logout successful');
    }

    public function me(Request $request)
    {
        $user = User::with('role')->find($request->user()->id);
        return JSONFormatter::format(200, null, $user);
    }
}
