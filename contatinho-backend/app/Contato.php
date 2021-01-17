<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contato extends Model {

    protected $table = 'contato';
    protected $fillable = [
        'first_name', 'last_name', 'email', 'birthday', 'photo_id'
    ];

    public function foto() {
        return $this->belongsTo('App\Photo', 'photo_id');
    }

    public function telefones() {
        return $this->hasMany('App\Phone', 'contato_id');
    }
}
