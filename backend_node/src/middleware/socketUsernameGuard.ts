import type { Socket } from "socket.io";

export const socketUsernameGuard = (
    socketConnection: Socket,
    nextMiddleware: (error?: Error) => void
): void => {
    const providedUserName = (socketConnection.handshake?.auth?.username ?? "")
        .toString()
        .trim();

    if (!providedUserName) {
        nextMiddleware(new Error("username required"));
        return;
    }

    socketConnection.data.name = providedUserName;
    nextMiddleware();
};
