<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('save', [\App\Http\Controllers\Api\AliProductController::class, 'save'])->name('save');
