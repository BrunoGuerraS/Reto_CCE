import express from "express"
import { createServer } from "http"
import path from "path"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:4000"]
    }
})

type Presence = "online" | "offline";

type UserState = {
    sockets: Set<string>;
    status: Presence;
    lastSeen: number; 
};

app.use(express.static(path.join(__dirname, "/src/views")))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + "/src/views/index.html")
// })

io.use((socket, next) => {
    const name = (socket.handshake.auth?.username || "").toString().trim();
    if (!name) return next(new Error("username required"));
    socket.data.name = name;
    next();
});

const users = new Map<string, UserState>();

const emitUsersList = () => {
    const list = [...users.entries()].map(([name, u]) => ({
        name,
        status: u.sockets.size > 0 ? "online" as Presence : "offline" as Presence,
    }));
    io.emit("users:list", list);
};

io.on("connection", socket => {

    console.log("clientes connected:", io.engine.clientsCount)
    console.log(socket.id)

    const { id } = socket;
    const name = socket.data.name;
    const user = users.get(name) ?? { sockets: new Set<string>(), status: "offline", lastSeen: Date.now() };
    user.sockets.add(id);
    user.status = "online";
    users.set(name, user);

    emitUsersList()

    socket.broadcast.emit("user:joined", { id, name })

    socket.on("message", (raw) => {
        const message = String(raw ?? "").trim();
        if (!message) return;
        console.log(message)
        const now = new Date();
        const payload = {
            id: now.getTime(),
            message,
            timestamp: now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
            fromName: name
        };

        io.to(id).emit("message", { ...payload, isUser: true });

        socket.broadcast.emit("message", { ...payload, isUser: false });
    });

    socket.on("disconnect", () => {
        const user = users.get(name);
        if (!user) return;
        user.sockets.delete(id);
        user.lastSeen = Date.now();
        if (user.sockets.size === 0) user.status = "offline";
        users.set(name, user);
        emitUsersList();
    })

})

httpServer.listen(3000)
