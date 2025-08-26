<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatAdminController extends Controller
{
    private string $baseUrl;
    private string $token;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('services.msnode.api_url'), '/');
        $this->token   = (string) config('services.node.admin_token'); // puede estar vacío
    }

    public function updateTitle(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|min:1|max:100',
        ]);
        $res = Http::baseUrl($this->baseUrl)
            ->acceptJson()
            ->timeout(10)
            // ->withHeaders(['Authorization' => 'Bearer '.$this->token]) // no lo usamos
            ->post('/admin/update-title', $data);   // <--- title va en el body

        // 3) Manejo de respuesta
        if (!$res->successful()) {
            return back()->withErrors([
                'updateTitle' => "Node respondió HTTP {$res->status()}: " . $res->body(),
            ])->withInput();
        }

        return back()->with('status', 'Título actualizado y emitido por Socket.IO');
    }

    public function broadcast(Request $request)
    {
        $data = $request->validate([
            'message' => 'required|string|min:1|max:500',
        ]);

        $res = Http::baseUrl($this->baseUrl)
            ->acceptJson()
            ->timeout(10)
            ->post('/admin/broadcast', $data);   

        if (!$res->successful()) {
            return back()->withErrors([
                'broadcast' => "Node respondió HTTP {$res->status()}: " . $res->body(),
            ])->withInput();
        }

        return back()->with('status', 'Mensaje enviado a todos los chats');
    }
}
