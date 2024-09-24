<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function save(ProductRequest $request): JsonResponse
    {

        $product = new Product();
        $product->fill($request->validated());
        $product->save();
        return response()->json($product);
    }
}
