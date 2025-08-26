import express from "express"
import { createServer } from "http"
import path from "path"
import { Server } from "socket.io"
import { socketUsernameGuard } from "./src/middleware/socketUsernameGuard"
import { registerChatHandlers } from "./src/sockets/chatHandlers"
import { config } from "./src/config/env"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: config.httpCorsOrigins
    }
})

app.use(express.static(path.join(__dirname, "/src/views")))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + "/src/views/index.html")
// })

io.use(socketUsernameGuard)
registerChatHandlers(io)


httpServer.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`)
})
