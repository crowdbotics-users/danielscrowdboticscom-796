<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFiledsToCommentsLikeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comments_likes', function (Blueprint $table) {
            //
            $table->text('messages')->nullable()->change();
            $table->integer('parent_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comments_likes', function (Blueprint $table) {
            //
            $table->text('messages')->nullable(false)->change();
            $table->integer('parent_id')->nullable(false)->change();
        });
    }
}
