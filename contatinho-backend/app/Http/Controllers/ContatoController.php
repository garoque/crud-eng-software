<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Contato;
use App\Phone;
use App\Photo;
use Carbon\Carbon;

class ContatoController extends Controller {

    public function get() {
        $contatos = Contato::with('telefones')->orderBy('first_name')->get();

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
                    'telefone1' => 'required',
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

        if ($request->contato['telefone1'] != NULL) {
            $contato_number = new Phone();

            $contato_number->contato_id = $contato->id;
            $contato_number->number = $request->contato['telefone1'];

            $contato_number->save();
        }

        if ($request->contato['telefone2'] != NULL) {
            $contato_number = new Phone();

            $contato_number->contato_id = $contato->id;
            $contato_number->number = $request->contato['telefone2'];

            $contato_number->save();
        }

        if ($request->contato['telefone3'] != NULL) {
            $contato_number = new Phone();

            $contato_number->contato_id = $contato->id;
            $contato_number->number = $request->contato['telefone3'];

            $contato_number->save();
        }

//        if (isset($request->photo)) {
//            // TO DO
//        }
    }

    public function update(Request $request) {
        $contato = Contato::where('id', $request->contato['id'])->with('telefones')->firstOrFail();

        $contato->first_name = $request->contato['nome'];
        $contato->last_name = $request->contato['sobrenome'];
        $contato->birthday = Carbon::createFromFormat('d/m/Y', $request->contato['dataAniversario'])->format('Y-m-d');
        $contato->email = $request->contato['email'];

        $contato->save();
        
        foreach ($contato->telefones as $telefone) {
            $telefone->delete();
        }

        if (isset($request->contato['telefone1'])) {
            if ($request->contato['telefone1'] != NULL) {
                $contato_number = new Phone();

                $contato_number->contato_id = $contato->id;
                $contato_number->number = $request->contato['telefone1'];

                $contato_number->save();
            }

            if ($request->contato['telefone2'] != NULL) {
                $contato_number = new Phone();

                $contato_number->contato_id = $contato->id;
                $contato_number->number = $request->contato['telefone2'];

                $contato_number->save();
            }

            if ($request->contato['telefone3'] != NULL) {
                $contato_number = new Phone();

                $contato_number->contato_id = $contato->id;
                $contato_number->number = $request->contato['telefone3'];

                $contato_number->save();
            }
        }

//        if (isset($request->photo)) {
//            // TO DO
//        }
    }

    public function delete($id) {
        $contato = Contato::where('id', $id)->with('telefones')->firstOrFail();

        foreach ($contato->telefones as $telefone) {
            $telefone->delete();
        }

        $contato->delete();
    }

}
