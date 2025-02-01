<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChefController;
use App\Http\Controllers\CulinaryCreationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' =>'v1'], function() {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    Route::group([ 'prefix' => 'users', 'middleware' => 'auth:sanctum' ], function() {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::post('/', [UserController::class, 'store']);
        Route::post('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

    Route::group([ 'prefix' => 'dashboard', 'middleware' => 'auth:sanctum' ], function() {
        Route::get('/', [DashboardController::class, 'index']);
    });

    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

    Route::group([ 'prefix' => 'settings' ], function() {
        Route::get('features', [FeatureController::class, 'index']);
        Route::get('testimonials', [TestimonialController::class, 'index']);
        Route::get('chefs', [ChefController::class, 'index']);
        Route::get('culinarycreations', [CulinaryCreationController::class, 'index']);
        Route::get('about', [AboutController::class, 'index']);
        Route::get('hero', [HeroController::class, 'index']);
        Route::group([ 'middleware' => 'auth:sanctum' ], function() {
            Route::post('culinarycreations', [CulinaryCreationController::class, 'store']);
            Route::post('culinarycreations/{id}', [CulinaryCreationController::class, 'update']);
            Route::delete('culinarycreations/{id}', [CulinaryCreationController::class, 'destroy']);

            Route::post('about', [AboutController::class, 'store']);
            Route::post('about/{id}', [AboutController::class, 'update']);
            Route::delete('about/{id}', [AboutController::class, 'destroy']);

            Route::post('hero', [HeroController::class, 'store']);
            Route::post('hero/{id}', [HeroController::class, 'update']);
            Route::delete('hero/{id}', [HeroController::class, 'destroy']);

            Route::post('features', [FeatureController::class, 'store']);
            Route::post('features/{id}', [FeatureController::class, 'update']);
            Route::delete('features/{id}', [FeatureController::class, 'destroy']);

            Route::post('testimonials', [TestimonialController::class, 'store']);
            Route::post('testimonials/{id}', [TestimonialController::class, 'update']);
            Route::delete('testimonials/{id}', [TestimonialController::class, 'destroy']);

            Route::post('chefs', [ChefController::class, 'store']);
            Route::post('chefs/{id}', [ChefController::class, 'update']);
            Route::delete('chefs/{id}', [ChefController::class, 'destroy']);
        });
    });
});
