<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConversationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conversation', function (Blueprint $table) {
            $table->increments('id');
            $table->text('content');
            $table->integer('sender_id');
            $table->integer('receiver_id');
            $table->string('image_url');
            $table->enum('conversation_status',['sending', 'delivered','read'])->default('sending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conversation');
    }
}
