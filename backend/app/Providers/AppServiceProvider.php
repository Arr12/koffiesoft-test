<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Response::macro('withCors', function ($response) {
            return $response->header('Access-Control-Allow-Origin', '*') // Or specify allowed origins like 'http://yourfrontend.com'
                ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
                ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Authorization, Origin');
        });

        // Apply CORS to every response globally
        app('router')->pushMiddlewareToGroup('api', \App\Http\Middleware\CorsMiddleware::class);
    }
}
