<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Contato;
use App\Phone;
use App\Photo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ContatoController extends Controller {

    public function get() {
        $contatos = Contato::all();
        
        foreach ($contatos as $contato) {
            $contato->birthday = Carbon::createFromFormat('Y-m-d', $contato->birthday)->format('d/m/Y');
        }
        
        return response()->json($contatos);
    }

    public function store(Request $request) {
        $errors = array();

        $validator = Validator::make($request->contato, [
                    'dataAniversario' => 'required',
                    'nome' => 'required',
                    'sobrenome' => 'required',
                    'email' => 'required',
//                    'number' => 'required',
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->getMessages() as $item) {
                array_push($errors, $item[0]);
            }
        }

        if (!empty($errors)) {
            return response()->json(['errors' => $errors]);
        }

        $contato = new Contato();

        $contato->first_name = $request->contato['nome'];
        $contato->last_name = $request->contato['sobrenome'];
        $contato->birthday = Carbon::createFromFormat('d/m/Y', $request->contato['dataAniversario'])->format('Y-m-d');
        $contato->email = $request->contato['email'];

        $contato->save();

//        foreach ($request->number as $number) {
//            $contato_number = new Phone();
//
//            $contato_number->contato_id = $contato->id;
//            $contato_number->number = $number;
//
//            $contato_number->save();
//        }
//
//        if (isset($request->photo)) {
//            // TO DO
//        }
    }

    public function update(Request $request, $id) {
        $contato = Contato::where('id', $id)->firstOrFail();
        
        $contato->first_name = $request->contato['nome'];
        $contato->last_name = $request->contato['sobrenome'];
        $contato->birthday = Carbon::createFromFormat('d/m/Y', $request->contato['dataAniversario'])->format('Y-m-d');
        $contato->email = $request->contato['email'];

        $contato->save();

//        if (isset($request->phone)) {
//            // deletar os números antes
//            
//            foreach ($request->number as $number) {
//                $contato_number = new Phone();
//
//                $contato_number->contato_id = $contato->id;
//                $contato_number->number = $number;
//
//                $contato_number->save();
//            }
//        }
//
//        if (isset($request->photo)) {
//            // TO DO
//        }
    }

    public function delete($id) {
        $contato = Contato::with(['phone', 'photo'])->where('id', $id)->firstOrFail();
        
        foreach ($contato->phone as $phone) {
            $phone->delete();
        }
        
        $contato->delete();
    }
}
