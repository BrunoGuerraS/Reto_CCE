import type { Server, Socket } from "socket.io";
import { Presence, UserState } from "../types/chat";
import { nowTimeLabel } from "../utils/time";

export const registerChatHandlers = (socketServer: Server): void => {
    const usersRegistry = new Map<string, UserState>();

    const emitUsersList = (): void => {
        const usersList = [...usersRegistry.entries()].map(([userName, userState]) => ({
            name: userName,
            status: userState.sockets.size > 0
                ? Presence.Online
                : Presence.Offline,
        }));
        socketServer.emit("users:list", usersList);
    };

    socketServer.on("connection", (socketConnection: Socket) => {

        const socketId = socketConnection.id;
        const connectedUserName = String(socketConnection.data.name);

        const existingUserState =
            usersRegistry.get(connectedUserName) ??
            ({
                sockets: new Set<string>(),
                status: Presence.Offline,
                lastSeen: Date.now()
            } as UserState)

        existingUserState.sockets.add(socketId);
        existingUserState.status = Presence.Online;
        usersRegistry.set(connectedUserName, existingUserState);

        emitUsersList();

        socketConnection.broadcast.emit("user:joined", {
            id: socketId,
            name: connectedUserName
        });

        socketConnection.on("message", (rawMessage: unknown) => {
            const messageText = String(rawMessage ?? "").trim();
            if (!messageText) return;

            const now = new Date();
            const basePayload = {
                id: now.getTime(),
                message: messageText,
                timestamp: nowTimeLabel(),
                fromName: connectedUserName,
            };

            socketServer
                .to(socketId)
                .emit("message", { ...basePayload, isUser: true });

            socketConnection
                .broadcast
                .emit("message", { ...basePayload, isUser: false });
        });

        socketConnection.on("disconnect", () => {
            const userStateOnDisconnect = usersRegistry.get(connectedUserName);
            if (!userStateOnDisconnect) return;

            userStateOnDisconnect.sockets.delete(socketId);
            userStateOnDisconnect.lastSeen = Date.now();
            if (userStateOnDisconnect.sockets.size === 0) userStateOnDisconnect.status = Presence.Offline;
            usersRegistry.set(connectedUserName, userStateOnDisconnect);

            emitUsersList();
        });
    });
};
