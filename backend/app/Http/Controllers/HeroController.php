<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use Illuminate\Http\Request;

class HeroController extends Controller
{
    public function index()
    {
        $hero = Hero::limit(1)->orderBy('created_at', 'desc')->get();
        return response()->json($hero);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'thumbnail' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048', // Image validation
        ]);

        // Handle file upload
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public'); // 'public' disk is assumed
        }

        // Create the Hero
        return Hero::create([
            'name' => $request->name,
            'description' => $request->description,
            'thumbnail' => isset($thumbnailPath) ? $thumbnailPath : null, // Save the path if thumbnail was uploaded
            'button_text' => $request->button_text,
        ]);
    }

    public function show($id)
    {
        return Hero::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048', // Optional thumbnail validation
        ]);

        // Find the existing Hero
        $hero = Hero::findOrFail($id);

        // Handle file upload (if a new thumbnail is provided)
        if ($request->hasFile('thumbnail')) {
            // Delete the old thumbnail if it exists
            if ($hero->thumbnail && file_exists(public_path('storage/' . $hero->thumbnail))) {
                unlink(public_path('storage/' . $hero->thumbnail));
            }

            // Store the new thumbnail
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        // Update the Hero
        $hero->update([
            'name' => $request->name,
            'description' => $request->description,
            'thumbnail' => isset($thumbnailPath) ? $thumbnailPath : $hero->thumbnail, // Keep old thumbnail if no new one is uploaded
        ]);

        return $hero;
    }

    public function destroy($id)
    {
        $Hero = Hero::findOrFail($id);

        // Delete the thumbnail from storage if it exists
        if ($Hero->thumbnail && file_exists(public_path('storage/' . $Hero->thumbnail))) {
            unlink(public_path('storage/' . $Hero->thumbnail));
        }

        $Hero->delete();

        return response()->json(['message' => 'Hero deleted successfully']);
    }
}
