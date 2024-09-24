<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ali_products', function (Blueprint $table) {
            $table->id();
            $table->string('productId');
            $table->string('title');
            $table->string('productType');
            $table->string('collection')->nullable();
            $table->integer('quantity');
            $table->text('description')->nullable();
            $table->decimal('price',8,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ali_products');
    }
};
