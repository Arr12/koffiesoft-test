<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create the 'features' table
        Schema::create('hero', function (Blueprint $table) {
            $table->string('id');
            $table->string('name');
            $table->text('description');
            $table->string('thumbnail');
            $table->string('button_text');
            $table->timestamps();
        });

        Schema::create('features', function (Blueprint $table) {
            $table->string('id');
            $table->string('title');
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('culinary_creations', function (Blueprint $table) {
            $table->string('id');
            $table->string('name');
            $table->string('thumbnail');
            $table->timestamps();
        });

        Schema::create('about', function (Blueprint $table) {
            $table->string('id');
            $table->string('name');
            $table->text('description');
            $table->string('thumbnail');
            $table->timestamps();
        });

        // Create the 'testimonials' table
        Schema::create('testimonials', function (Blueprint $table) {
            $table->string('id');
            $table->text('text');
            $table->string('author');
            $table->timestamps();
        });

        // Create the 'chefs' table
        Schema::create('chefs', function (Blueprint $table) {
            $table->string('id');
            $table->string('name');
            $table->text('bio');
            $table->string('image')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero');
        Schema::dropIfExists('features');
        Schema::dropIfExists('about');
        Schema::dropIfExists('culinary_creations');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('chefs');
    }
};
