<?php

namespace App\Http\Controllers;

use App\Helpers\JSONFormatter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $users = User::with('role')->where('name', 'like', "%$search%")->get();
        return JSONFormatter::format(200, 'Users retrieved successfully', $users);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role_id' => 'required'
        ]);

        if ($validator->fails()) {
            return JSONFormatter::format(422, 'Validation Failed', $validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $request->role_id
        ]);

        return JSONFormatter::format(200, 'User created successfully', $user);


    }

    public function show(User $user)
    {
        $user->load('role');
        return JSONFormatter::format(200, "User with id $user->id found successfully", $user);
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable',
            'role_id' => 'required',
        ]);

        if ($validator->fails()) {
            return JSONFormatter::format(422, 'Validation Failed', $validator->errors());
        }

        $arr = [
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => $request->role_id
        ];

        if ($request->has('password') AND isset($request->password)) {
            $arr['password'] = bcrypt($request->password);
        }

        $user->update($arr);

        return JSONFormatter::format(200, "User with id $user->id updated successfully", $user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return JSONFormatter::format(200, "User with id $user->id deleted successfully", null);
    }
}
