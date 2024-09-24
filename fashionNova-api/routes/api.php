<?php

use Illuminate\Support\Facades\Route;


Route::post('save-product',[\App\Http\Controllers\Api\ProductController::class, 'save'])->name('save-product');
