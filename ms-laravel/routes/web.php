<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatAdminController;

Route::view('/', 'welcome')->name('home');

Route::post('/update-title', [ChatAdminController::class, 'updateTitle'])
    ->name('chat.admin.updateTitle');

Route::post('/broadcast', [ChatAdminController::class, 'broadcast'])
    ->name('chat.admin.broadcast');
