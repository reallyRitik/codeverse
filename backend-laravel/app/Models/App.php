<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'prompt', 'template'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}