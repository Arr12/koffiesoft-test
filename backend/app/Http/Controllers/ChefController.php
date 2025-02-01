<?php

namespace App\Http\Controllers;

use App\Models\Chef;
use Illuminate\Http\Request;

class ChefController extends Controller
{
    // Store a new chef
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'bio' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',  // Optional image validation
        ]);

        // Handle file upload for image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('thumbnails', 'public'); // 'public' disk
        }

        // Create the chef
        $chef = Chef::create([
            'id' => uniqid(),  // Generates a unique ID, you can change this if needed
            'name' => $request->name,
            'bio' => $request->bio,
            'image' => isset($imagePath) ? $imagePath : null,  // Save the file path if image is uploaded
        ]);

        return response()->json($chef, 201);
    }

    // Get a list of all chefs
    public function index()
    {
        $chefs = Chef::all();  // Get all chefs
        return response()->json($chefs);
    }

    // Show the chef details
    public function show($id)
    {
        $chef = Chef::findOrFail($id);  // Find by ID or fail
        return response()->json($chef);
    }

    // Update an existing chef
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'bio' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',  // Optional image validation
        ]);

        // Find the existing chef
        $chef = Chef::findOrFail($id);

        // Handle file upload if new image is provided
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($chef->image && file_exists(public_path('storage/' . $chef->image))) {
                unlink(public_path('storage/' . $chef->image));
            }

            // Store the new image
            $imagePath = $request->file('image')->store('thumbnails', 'public');
        }

        // Update the chef
        $chef->update([
            'name' => $request->name,
            'bio' => $request->bio,
            'image' => isset($imagePath) ? $imagePath : $chef->image,  // Keep old image if no new one
        ]);

        return response()->json($chef);
    }

    // Delete a chef
    public function destroy($id)
    {
        $chef = Chef::findOrFail($id);

        // Delete the image from storage if it exists
        if ($chef->image && file_exists(public_path('storage/' . $chef->image))) {
            unlink(public_path('storage/' . $chef->image));
        }

        $chef->delete();

        return response()->json(['message' => 'Culinary Creation deleted successfully']);
    }

}
