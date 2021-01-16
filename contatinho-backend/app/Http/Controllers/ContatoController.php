<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contato;
use App\Phone;
use App\Photo;
use Illuminate\Support\Facades\Log;

class ContatoController extends Controller {

    public function get() {
        return response()->json(Contato::all());
    }

    public function store(Request $request) {
        $errors = array();

        $validator = Validator::make($request->all(), [
                    'birthday' => 'required|date_format:Y-m-d',
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'email' => 'required',
                    'number' => 'required',
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

        $contato->first_name = $request->first_name;
        $contato->last_name = $request->last_name;
        $contato->birthday = $request->birthday;
        $contato->email = $request->email;

//        $contato->save();

        foreach ($request->number as $number) {
            $contato_number = new Phone();

            $contato_number->contato_id = $contato->id;
            $contato_number->number = $number;

            $contato_number->save();
        }

        if (isset($request->photo)) {
            // TO DO
        }

        Log::info($contato);
        Log::info($contato_number);
    }

    public function update(Request $request, $id) {
        $contato = Contato::with(['phone', 'photo'])->where('id', $id)->firstOrFail();
        Log::info($contato);

//        $contato->first_name = $request->first_name;
//        $contato->last_name = $request->last_name;
//        $contato->birthday = $request->birthday;
//        $contato->email = $request->email;
//
//        $contato->save();
//
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

    public function destroy($id) {
        $contato = Contato::with(['phone', 'photo'])->where('id', $id)->firstOrFail();
        
        foreach ($contato->phone as $phone) {
            $phone->delete();
        }
        
        $contato->delete();
    }

}
