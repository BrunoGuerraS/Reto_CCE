import express from "express"
import { createServer } from "http"
import path from "path"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
})

const socketsOnline: any = []

app.use(express.static(path.join(__dirname, "/src/views")))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/views/index.html")
})

io.on("connection", socket => {

    console.log("clientes connected:", io.engine.clientsCount)
    console.log(socket.id)


    socket.on("disconnect", () => {
        console.log("disconnect")
    })

    socket.on("message", data => {
        console.log(data)
        socket.broadcast.emit("message", data);
    })

})

httpServer.listen(3000)
