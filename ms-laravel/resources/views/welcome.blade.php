<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <title>Panel Admin – CCE Chat</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    @php $css = resource_path('css/chat-admin.css'); @endphp
    @if (is_file($css))
        <style>
            {!! file_get_contents($css) !!}
        </style>
    @endif
</head>

<body>

    <header class="appbar">
        <div class="appbar__logo">CCE</div>
        <div class="appbar__title">Cámara de Comercio Exterior – Panel Admin</div>
        <div style="margin-left:auto" class="pill"><span class="dot"></span> Admin</div>
    </header>

    <main class="container">
        {{-- Mensajes de estado / error --}}
        <div class="alerts">
            @if (session('status'))
                <div class="alert ok">{{ session('status') }}</div>
            @endif
            @if ($errors->any())
                <div class="alert err">
                    <ul style="margin:0 0 0 18px;">
                        @foreach ($errors->all() as $e)
                            <li>{{ $e }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>

        <div class="grid">
            {{-- Card: Modificar Título --}}
            <section class="card">
                <h2>Modificar título del chat</h2>
                <p class="hint">Actualiza el título principal para <strong>todas</strong> las sesiones abiertas.</p>

                <form method="POST" action="{{ route('chat.admin.updateTitle') }}" class="stack">
                    @csrf
                    <div class="row">
                        <div class="grow">
                            <label for="title">Nuevo título</label>
                            <input id="title" name="title" type="text" placeholder="Ej: CCE Chat – Soporte"
                                value="{{ old('title') }}" required maxlength="100" />
                            @error('title')
                                <div class="alert err" style="margin-top:8px;">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>
                    <div class="row">
                        <button type="submit">Actualizar título en todos</button>
                    </div>
                </form>
            </section>

            {{-- Card: Mensaje global --}}
            <section class="card">
                <h2>Enviar mensaje a todos los chats</h2>
                <p class="hint">Difunde un aviso como <strong>“System”</strong> (aparece en todos los chats).</p>

                <form method="POST" action="{{ route('chat.admin.broadcast') }}" class="stack">
                    @csrf
                    <div>
                        <label for="message">Mensaje</label>
                        <textarea id="message" name="message" placeholder="Ej: El sistema se reiniciará en 5 minutos." required
                            maxlength="500">{{ old('message') }}</textarea>
                        @error('message')
                            <div class="alert err" style="margin-top:8px;">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="row">
                        <button type="submit">Enviar a todos</button>
                    </div>
                </form>
            </section>
        </div>


    </main>

    <script>
        // Autocierra el cartel de OK
        setTimeout(() => {
            const ok = document.querySelector('.alert.ok');
            if (ok) ok.remove();
        }, 3000);
    </script>
</body>

</html>
