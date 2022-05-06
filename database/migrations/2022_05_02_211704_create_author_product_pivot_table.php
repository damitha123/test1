<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAuthorProductPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('authors_products', function (Blueprint $table) {
            $table->unsignedBigInteger('authors_id')->index();
            $table->foreign('authors_id')->references('id')->on('authors')->onDelete('cascade');
            $table->unsignedBigInteger('products_id')->index();
            $table->foreign('products_id')->references('id')->on('products')->onDelete('cascade');
            $table->primary(['authors_id', 'products_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('author_product');
    }
}
