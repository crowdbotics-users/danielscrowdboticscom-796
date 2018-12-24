<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddNullConstraintToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function __construct()
    {
        DB::getDoctrineSchemaManager()->getDatabasePlatform()->registerDoctrineTypeMapping('enum', 'string');
    }

    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->string('DOB')->nullable()->change();
            $table->string('profile_image')->nullable()->change();
            $table->string('full_name')->nullable()->change();
            $table->string('email')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->string('DOB')->nullable()->change(false);
            $table->string('profile_image')->nullable()->change(false);
            $table->string('full_name')->nullable()->change(false);
            $table->string('email')->nullable()->change(false);
            $table->string('user_name')->nullable()->change(false);
        });
    }
}
