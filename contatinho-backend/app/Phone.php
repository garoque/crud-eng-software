<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model {

    protected $table = 'phone';
    protected $fillable = [
        'contato_id', 'number'
    ];

    public function contato() {
        return $this->belongsTo('App\Contato', 'contato_id');
    }
}
