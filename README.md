# Chat en tiempo real con Socket.IO + React + Integración PHP (Laravel)

Aplicación de **chat en tiempo real** construida con **Node.js + Express + Socket.IO (TypeScript)**, un **frontend React** para interactuar con el chat y una **aplicación PHP (Laravel)** que se comunica por HTTP con el servidor Node para:

- **Modificar el título** del chat en todas las ventanas abiertas.
- **Enviar mensajes** a todos los usuarios conectados “como si” fuera otro usuario más.

> **Objetivo de evaluación**: demostrar habilidades en backend, frontend, comunicación inter-servicios (HTTP + WebSockets) y buenas prácticas de control de versiones.

---

## Tabla de contenidos
- [Descripción del proyecto](#descripción-del-proyecto)
- [Tecnologías y versiones](#tecnologías-y-versiones)
- [Arquitectura y flujo](#arquitectura-y-flujo)
- [Instalación y configuración](#instalación-y-configuración)
  - [1) Servidor Node.js (Express + Socket.IO + TS)](#1-servidor-nodejs-express--socketio--ts)
  - [2) Frontend React](#2-frontend-react)
  - [3) PHP con Laravel](#3-php-con-laravel)
- [Instrucciones de uso](#instrucciones-de-uso)

---

## Descripción del proyecto

- **Chat en tiempo real** donde cada mensaje enviado por un usuario se **distribuye a todos** los usuarios conectados.
- **Identificación simple** de emisor (p. ej., “Yo: …” o “Anónimo: …”).  
- **Integración con PHP (Laravel)**: desde una página Laravel puedes:
  1. **Cambiar el título** del chat globalmente (todas las pestañas).
  2. **Enviar un mensaje** a todos los chats conectados.

Se cumple con:
- Registro básico de **conexiones/desconexiones**.
- **CORS** entre servicios.
- **Validaciones** y manejo básico de errores.

---

## Tecnologías y versiones

> Las versiones exactas están en `package.json` (Node/React) y `composer.lock` (Laravel). Aquí se listan las principales:

- **Node.js** ≥ 20.x  
- **npm** ≥ 10.x / **pnpm**/**yarn** (opcional)  
- **TypeScript** 5.x  
- **Express** 4.x  
- **Socket.IO** 4.x  
- **Next**
- **PHP** 8.2+  
- **Laravel** 11.x  
- **cURL** (extensión PHP para HTTP saliente)

---

## Arquitectura y flujo

```
[React UI]  <--socket.io-->  [Node.js + Socket.IO + Express API]
     ^                                   ^
     |                                   | (HTTP JSON)
     |                                   v
 Navegador                         [Laravel (PHP) + cURL]
```

- **WebSocket (Socket.IO)**: React se conecta al servidor Node para enviar/recibir mensajes en tiempo real.
- **HTTP**: Laravel hace peticiones POST al servidor Node para:
  - `/api/title` → emitir evento que actualiza el **título** en todas las UIs.
  - `/api/broadcast` → emitir un **mensaje** a todos.

---

## Instalación y configuración

> Requisitos previos: Node.js, PHP, Composer. Opcional: pnpm/yarn.

El proyecto se divide en tres carpetas: `backend_node/`, `frontend_next/`, `ms-laravel`.

### 1) Servidor Node.js (Express + Socket.IO + TS)

```bash
cd backend_node
cp .env.example .env
# Edita .env si es necesario (puertos/orígenes CORS)
npm install
# Desarrollo (hot reload con ts-node-dev / nodemon):
npm run dev
# Producción:
npm run build && npm run start
```

**Variables `.env` (server/.env):**
```env
PORT=3000
# Orígenes permitidos para CORS y Socket.IO (separados por coma)
CORS_ORIGINS=http://localhost:5173,http://localhost:8000
# Etiqueta por defecto si no hay usuario
DEFAULT_USERNAME=Anonimo
```

### 2) Frontend React

```bash
cd frontend_next
cp .env.example .env
npm install
npm run dev  # arranca Vite en http://localhost:5173 (por defecto)
```

**Variables `.env` (web/.env):**
```env
VITE_SOCKET_URL=http://localhost:3000
VITE_DEFAULT_USERNAME=Yo
```

### 3) PHP con Laravel

```bash
cd php-app
cp .env.example .env
composer install
php artisan key:generate
# Arranca en http://localhost:8000 (por defecto)
php artisan serve
```

**Variables `.env` (php-app/.env):**
```env
# Base URL del API de Node (para cURL / Http::post)
NODE_API_BASE_URL=http://localhost:3000
```

---

## Instrucciones de uso

1. **Levanta el servidor Node** (`npm run dev` en `backend_node/`).
2. **Levanta React** (`npm run dev` en `frontend_next/`) y abre `http://localhost:4000`.
   - Registra tu nombre
   - Escribe un mensaje y envíalo. Debe aparecer en **todas** las ventanas conectadas.
   - Abre la UI en varias pestañas/ventanas para ver la sincronización.
3. **Levanta Laravel** (`php artisan serve` en `ms-laravel/`) y abre `http://localhost:8080`.
   - Pulsa **“Modificar título”** → el `<h1>` (o `<title>`) del chat debe cambiar en **todas** las UIs.
   - Pulsa **“Enviar mensaje a todos”** → debe aparecer en el chat como mensaje del “sistema”.

> Consejo: si algo no se refleja, revisa la **consola del navegador** y la **consola del servidor Node**.


---

## Endpoints (Node.js)

- `POST /admin/update-title`
  - **Body**: `{ "title": "Nuevo título" }`
  - **Efecto**: emite `system:title:update` por Socket.IO a todos.

- `POST /admin/broadcast`
  - **Body**: `{ "message": "Texto a enviar" }`
  - **Efecto**: emite `chat:message` a todos (como “sistema”/“php-bot”).

**Eventos Socket.IO:**
- **Cliente → Servidor**
  - `message` → `{  message: string }`
- **Servidor → Clientes**
  - `message` → `{ id: number; message: string timestamp: string;
    isUser: boolean;
    fromName: string; }`
  - `title:update` → `{ title: string }`
 










