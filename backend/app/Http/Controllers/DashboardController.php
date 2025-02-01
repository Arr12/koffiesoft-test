<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'stats' => [
                'totalUsers' => User::where('email', '!=', 'adm@example.com')->count(),
                'totalActivity' => Activity::count(),
            ],
            'users' => User::select('name', 'email')->limit(50)->orderBy('created_at', 'desc')->get(),
        ]);
    }

}
