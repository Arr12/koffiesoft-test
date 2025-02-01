<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function Login(Request $request) {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken(date('Y-m-d H:i:s') . $user->name)->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);

    }

    public function Register(Request $request) {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/|min:8|confirmed',
            ]);

            $user_request = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ];

            $user = User::create($user_request);

            return response()->json([
                'user' => $user,
                'message' => 'Pengguna berhasil didaftarkan.'
            ], 200);

        } catch (\Throwable $th) {

            return response()->json([
                'message' => $th->getMessage()
            ], 500);

        }

    }

    public function logout(Request $request)
    {
        dd(123);
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
