<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrdersController;

Route::get('/', function () {
    return redirect('/order');
});

Route::get('/order', [OrdersController::class, 'create'])->name('orders.create');
Route::post('/order', [OrdersController::class, 'store'])->name('orders.store');
