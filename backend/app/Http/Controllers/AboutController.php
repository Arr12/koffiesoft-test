<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    // Store a new about entry
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'thumbnail' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',  // Image validation
        ]);

        // Handle file upload for thumbnail
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        // Create the about entry
        $about = About::create([
            'name' => $request->name,
            'description' => $request->description,
            'button_text' => $request->button_text,
            'thumbnail' => isset($thumbnailPath) ? $thumbnailPath : null,  // Save the file path if image is uploaded
        ]);

        return response()->json($about, 201);
    }

    // Get a list of all about entries
    public function index()
    {
        $abouts = About::all();  // Get all about entries
        return response()->json($abouts);
    }

    // Show a specific about entry
    public function show($id)
    {
        $about = About::findOrFail($id);  // Find by ID or fail
        return response()->json($about);
    }

    // Update an existing about entry
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',  // Optional thumbnail validation
        ]);

        // Find the existing about entry
        $about = About::findOrFail($id);

        // Handle file upload if new thumbnail is provided
        if ($request->hasFile('thumbnail')) {
            // Delete the old thumbnail if it exists
            if ($about->thumbnail && file_exists(public_path('storage/' . $about->thumbnail))) {
                unlink(public_path('storage/' . $about->thumbnail));
            }

            // Store the new thumbnail
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        // Update the about entry
        $about->update([
            'name' => $request->name,
            'description' => $request->description,
            'button_text' => $request->button_text,
            'thumbnail' => isset($thumbnailPath) ? $thumbnailPath : $about->thumbnail,
        ]);

        return response()->json($about);
    }

    // Delete an about entry
    public function destroy($id)
    {
        $about = About::findOrFail($id);

        // Delete the thumbnail from storage if it exists
        if ($about->thumbnail && file_exists(public_path('storage/' . $about->thumbnail))) {
            unlink(public_path('storage/' . $about->thumbnail));
        }

        $about->delete();

        return response()->json(['message' => 'About deleted successfully']);
    }
}
