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
        Schema::create('user_domains', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->index()->comment('Domain name like example.com');
            $table->string('redirect_url')->nullable();
            $table->jsonb('mx')->nullable();
            $table->timestamp('redirect_verified_at')->nullable();
            $table->timestamp('mx_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_domains');
    }
};
