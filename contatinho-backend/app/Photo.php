<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model {

    protected $table = 'photo';
    protected $fillable = [
        'photo_name', 'photo_length'
    ];

    public function contato() {
        return $this->belongsTo('App\Contato', 'contato_id');
    }
}
