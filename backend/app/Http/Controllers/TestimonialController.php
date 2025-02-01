<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return Testimonial::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required|string',
            'author' => 'required|string',
        ]);

        return Testimonial::create($request->all());
    }

    public function show($id)
    {
        return Testimonial::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'text' => 'required|string',
            'author' => 'required|string',
        ]);

        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($request->all());
        return $testimonial;
    }

    public function destroy($id)
    {
        Testimonial::destroy($id);
        return response()->json(['message' => 'Testimonial deleted successfully']);
    }
}
