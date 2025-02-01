<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);
        $limit = $request->input('limit', 10);

        $user = $query->paginate($limit);

        return response()->json([
            'user' => $user
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::where('id', $id)->get();

        return response()->json([
            'user' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
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

            $user = User::find($id);
            $user->update($user_request);

            return response()->json([
                'user' => $user,
                'message' => 'Informasi pengguna berhasil dirubah.'
            ], 200);

        } catch (\Throwable $th) {

            return response()->json([
                'message' => $th->getMessage()
            ], 500);

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id)->delete();

        return response()->json([
            'user' => $user,
            'message' => 'Pengguna berhasil dihapus.'
        ], 200);
    }
}
