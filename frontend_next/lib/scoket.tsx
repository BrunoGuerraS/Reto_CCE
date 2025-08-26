"use client";
import { io, Socket } from "socket.io-client";
export const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3000", {
    autoConnect: false,
});