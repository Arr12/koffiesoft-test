<?php

namespace App\Http\Controllers;

use App\Models\CulinaryCreation;
use Illuminate\Http\Request;

class CulinaryCreationController extends Controller
{
    // Store a new culinary creation
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'thumbnail' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',  // Image validation
        ]);

        // Handle file upload
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public'); // 'public' disk
        }

        // Create the culinary creation
        $culinaryCreation = CulinaryCreation::create([
            'id' => uniqid(),  // Generates a unique ID, you can change this if needed
            'name' => $request->name,
            'thumbnail' => isset($thumbnailPath) ? $thumbnailPath : null, // Save the file path
        ]);

        return response()->json($culinaryCreation, 201);
    }

    // Get a list of all culinary creations
    public function index()
    {
        $culinaryCreations = CulinaryCreation::all();  // Get all culinary creations
        return response()->json($culinaryCreations);
    }

    // Show the culinary creation details
    public function show($id)
    {
        $culinaryCreation = CulinaryCreation::findOrFail($id);  // Find by ID or fail
        return response()->json($culinaryCreation);
    }

    // Update an existing culinary creation
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',  // Optional thumbnail validation
        ]);

        // Find the existing culinary creation
        $culinaryCreation = CulinaryCreation::findOrFail($id);

        // Handle file upload if new thumbnail is provided
        if ($request->hasFile('thumbnail')) {
            // Delete the old thumbnail if it exists
            if ($culinaryCreation->thumbnail && file_exists(public_path('storage/' . $culinaryCreation->thumbnail))) {
                unlink(public_path('storage/' . $culinaryCreation->thumbnail));
            }

            // Store the new thumbnail
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        // Update the culinary creation
        $culinaryCreation->update([
            'name' => $request->name,
            'thumbnail' => isset($thumbnailPath) ? $thumbnailPath : $culinaryCreation->thumbnail,  // Keep old thumbnail if no new one
        ]);

        return response()->json($culinaryCreation);
    }

    // Delete a culinary creation
    public function destroy($id)
    {
        $culinaryCreation = CulinaryCreation::findOrFail($id);

        // Delete the thumbnail from storage if it exists
        if ($culinaryCreation->thumbnail && file_exists(public_path('storage/' . $culinaryCreation->thumbnail))) {
            unlink(public_path('storage/' . $culinaryCreation->thumbnail));
        }

        $culinaryCreation->delete();

        return response()->json(['message' => 'Culinary Creation deleted successfully']);
    }
}
