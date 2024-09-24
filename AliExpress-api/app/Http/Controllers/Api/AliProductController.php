<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AliProductRequest;
use App\Models\AliProduct;
use Illuminate\Http\Request;

class AliProductController extends Controller
{
    public function save(AliProductRequest $request)
    {
        $product = new AliProduct();
        $product->fill($request->validated());
        $product->save();

        return response()->json($product);
    }
}
