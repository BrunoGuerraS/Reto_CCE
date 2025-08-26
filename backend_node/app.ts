import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { socketUsernameGuard } from "./src/middleware/socketUsernameGuard"
import { registerChatHandlers } from "./src/sockets/chatHandlers"
import { config } from "./src/config/env"
import { Response, Request, NextFunction } from "express";
import { nowTimeLabel } from "./src/utils/time"
import { setCurrentTitle } from "./src/state/appState"

const app = express()
const httpServer = createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const io = new Server(httpServer, {
    cors: {
        origin: config.httpCorsOrigins
    }
})

io.use(socketUsernameGuard)
registerChatHandlers(io)

app.post("/admin/update-title", (req: Request, res: Response) => {
    const requestedTitle = String(req.body?.title ?? "").trim();
    if (!requestedTitle) {
        return res.status(400).json({ error: "El campo 'title' es requerido." });
    }
    const sanitizedTitle = requestedTitle.slice(0, 120);
    setCurrentTitle(sanitizedTitle);
    io.emit("title:update", { title: sanitizedTitle });
    return res.status(200).json({ ok: true, title: sanitizedTitle });
});

app.post("/admin/broadcast", (req: Request, res: Response) => {
    const requestedMessage = String(req.body?.message ?? "").trim();
    if (!requestedMessage) {
        return res.status(400).json({ error: "El campo 'message' es requerido." });
    }

    const messageBody = requestedMessage.slice(0, 2000);
    const now = new Date();

    const socketPayload = {
        id: now.getTime(),
        message: messageBody,
        timestamp: nowTimeLabel(),
        isUser: false,
        fromName: "System",
    };

    io.emit("message", socketPayload);

    return res.status(200).json({ ok: true });
});


httpServer.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`)
})
