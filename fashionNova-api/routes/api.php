<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('save-product',[\App\Http\Api\ProductController::class, 'save'])->name('save-product');
