<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Panel Admin – CCE Chat</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root{
      /* Ajusta estos valores a tu paleta exacta */
      --brand-500: #D4AF37;   /* dorado principal */
      --brand-600: #C1992F;
      --brand-700: #AD8727;
      --ink-900:   #111827;   /* texto principal casi negro */
      --ink-700:   #374151;   /* subtítulos */
      --ink-500:   #6B7280;   /* muted */
      --surface:   #FFFFFF;   /* tarjetas */
      --bg:        #F7F6F2;   /* fondo marfil suave */
      --border:    #E5E7EB;   /* bordes suaves */
      --ok-bg:     #E8F5E9;   --ok-ink: #1B5E20;
      --err-bg:    #FDECEA;   --err-ink: #B71C1C;
      --focus:     rgba(212,175,55, .35);
      --radius:    14px;
    }
    * { box-sizing: border-box; }
    html, body { height: 100%; }
    body{
      margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      background: var(--bg); color: var(--ink-900);
    }
    .appbar{
      background:#0D0D0D; color:#fff; padding: 12px 20px; display:flex; align-items:center; gap:12px;
      position: sticky; top:0; z-index:10;
    }
    .appbar__logo{
      width:32px; height:32px; border-radius:8px; background:var(--brand-500);
      display:inline-flex; align-items:center; justify-content:center; font-weight:700; color:#0D0D0D;
    }
    .appbar__title{ font-weight:700; letter-spacing:.3px; }
    .container{ max-width:1000px; margin: 28px auto; padding: 0 16px; }
    .grid{ display:grid; gap:20px; grid-template-columns: 1.1fr 1fr; }
    @media (max-width: 900px){ .grid{ grid-template-columns: 1fr; } }

    .card{
      background: var(--surface); border:1px solid var(--border);
      border-radius: var(--radius); padding: 18px;
      box-shadow: 0 8px 24px rgba(0,0,0,.04);
    }
    .card h2{ margin:0 0 8px 0; font-size: 18px; }
    .card p.hint{ margin:0 0 14px 0; color: var(--ink-500); font-size: 14px; }

    form{ display:grid; gap:10px; }
    label{ font-size: 13px; color: var(--ink-700); }
    input[type="text"], textarea{
      width:100%; padding: 10px 12px; border:1px solid var(--border); border-radius: 10px;
      background:#fff; color: var(--ink-900); font-size:15px;
      transition: box-shadow .15s ease, border-color .15s ease;
    }
    textarea{ resize: vertical; min-height: 90px; }
    input:focus, textarea:focus{
      outline: none; border-color: var(--brand-500);
      box-shadow: 0 0 0 4px var(--focus);
    }
    .row{ display:flex; gap:10px; align-items:center; }
    .row .grow{ flex:1; }

    button{
      appearance:none; border:0; border-radius: 12px; padding: 10px 14px; font-weight:600; cursor:pointer;
      background: var(--brand-600); color:#0D0D0D;
      transition: transform .04s ease, filter .15s ease, background .15s ease;
    }
    button:hover{ filter: brightness(1.02); background: var(--brand-500); }
    button:active{ transform: translateY(1px); }
    .btn-secondary{
      background:#0D0D0D; color:#fff;
    }
    .btn-secondary:hover{ filter: brightness(1.05); }

    .stack{ display:grid; gap: 16px; }
    .alerts{ margin-bottom: 16px; }
    .alert{
      padding: 10px 12px; border-radius: 10px; font-size: 14px;
    }
    .alert.ok{ background: var(--ok-bg); color: var(--ok-ink); }
    .alert.err{ background: var(--err-bg); color: var(--err-ink); }

    .footer-note{
      margin-top: 22px; font-size:12px; color: var(--ink-500);
    }
    .pill{
      display:inline-flex; align-items:center; gap:8px; padding: 6px 10px; border-radius:999px;
      background:#121212; color:#fff; font-size:12px; font-weight:600;
    }
    .dot{ width:8px; height:8px; border-radius:999px; background: var(--brand-500); }
  </style>
</head>
<body>

  <header class="appbar">
    <div class="appbar__logo">CC</div>
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

        <form method="POST" 
        {{-- action="{{ route('chat.admin.updateTitle') }}"  --}}
        class="stack">
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
            <a class="btn-secondary" 
            {{-- href="{{ route('chat.admin') }}"  --}}
            style="text-decoration:none; display:inline-flex; align-items:center; padding:10px 12px;">Reiniciar</a>
          </div>
        </form>
      </section>

      {{-- Card: Mensaje global --}}
      <section class="card">
        <h2>Enviar mensaje a todos los chats</h2>
        <p class="hint">Difunde un aviso como <strong>“System”</strong> (aparece en todos los chats).</p>

        <form method="POST" 
        {{-- action="{{ route('chat.admin.broadcast') }}"  --}}
        class="stack">
          @csrf
          <div>
            <label for="message">Mensaje</label>
            <textarea id="message" name="message" placeholder="Ej: El sistema se reiniciará en 5 minutos."
                      required maxlength="500">{{ old('message') }}</textarea>
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

    <p class="footer-note">
      Consejo: protege los endpoints de Node con un token Bearer (mismo valor en el .env de Laravel y Node).
    </p>
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
