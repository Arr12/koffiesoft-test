<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    public function index()
    {
        $feature = Feature::all();
        return response()->json($feature);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        return Feature::create($request->all());
    }

    public function show($id)
    {
        return Feature::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $feature = Feature::findOrFail($id);
        $feature->update($request->all());
        return $feature;
    }

    public function destroy($id)
    {
        Feature::destroy($id);
        return response()->json(['message' => 'Feature deleted successfully']);
    }
}
