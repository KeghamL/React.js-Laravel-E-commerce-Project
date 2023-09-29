<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(){

        return response()->json(product::all());
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required',
            'description'  => 'required',
            'image' => 'required',
        ]);
         $image = $request->file('image')->store('public/images');
        Product::create([
          'title' => $request->title,
          'description' => $request->description,
          'image' =>  $image,
        ]);

        return response()->json("Product Created Successfully!");
    }

     public function show(Product $product)
    {
        return response()->json([
            'product' => $product
        ]);
    }

    public function update(Request $request , Product $product)
    {
         $request->validate([
            'title' => 'required',
            'description'  => 'required',
            'image' => 'required',
        ]);
         $image = $request->file('image')->store('public/images');
        $product->update([
          'title' => $request->title,
          'description' => $request->description,
          'image' =>  $image,
        ]);

        return response()->json("Product Updated Successfully!");
    }

    public function destroy(Product $product)
    {
        $product->delete();
        
        return response()->json("Product Deleted Successfully!");
    }
}
