const socket = io();

// const checkSocketStatus = () => {
//     console.log("socket status: ", socket.connected)
// }

// socket.on("connect", () => {
//     console.log("socket conectado =>", socket.id)
//     checkSocketStatus()

// })

// socket.on("connect_error", ()=> {
//     console.log("No se puede conectar")
// })

// socket.on("disconnect", () => {
//     console.log("socket desconectado =>", socket.id)
//     checkSocketStatus()
// })

// socket.io.on("reconnect_attempt", () => {
//     console.log("traying reconnect ......")
// }) 

// socket.io.on("reconnect", () => {
//     console.log("re-stabllished connection")
// })

// //emit msg
// const label = document.getElementById("loading-label");
// const button = document.querySelector('#emit-to-server')

// socket.on("welcome", data => {
//     console.log(data)
//     label.textContent = data

// })


// button.addEventListener("click", () => {
//     // socket.emit("server", "Hola servidor")
//     socket.emit("last", "hello")
// }) 


// socket.on("salute", msg => {
//     console.log("respuesta de salute: ", msg)
// })

//boradcash example
// const circle = document.querySelector("#circle")

// const drawCircle = position => {
//     circle.style.top = position.top
//     circle.style.left = position.left
// }


// const drag = e => {

//     const position = {
//         top: e.clientX + "px",
//         left: e.clientY + "px"
//     }
//     drawCircle(position)
//     socket.emit("circle position", position)
// }

// document.addEventListener("mousedown", e => {
//     console.log(e)
//     document.addEventListener("mousemove", drag)
// })

// document.addEventListener("mouseup", e => {
//     document.removeEventListener("mousemove", drag)
// })

// socket.on("move circle", position => {
//     drawCircle(position)
// })

//rooms


const connectRoom1 = document.querySelector("#connectRoom1")
const connectRoom2 = document.querySelector("#connectRoom2")
const connectRoom3 = document.querySelector("#connectRoom3")

//evento para conectarme a la sala 
connectRoom1.addEventListener("click", () => {
    socket.emit("connect to room", "room1")
})

connectRoom2.addEventListener("click", () => {
    socket.emit("connect to room", "room2")
})

connectRoom3.addEventListener("click", () => {
    socket.emit("connect to room", "room3")
})


//enviar el mesaje 

const sendMessage = document.querySelector("#sendMessage")
sendMessage.addEventListener("click", () => {
    const message = prompt("escribe tu mensaje")
    socket.emit("message", message)
})

//recibir el evento del mesaje Ç

socket.on("send message", data => {
    const { room, message } = data
    const li = document.createElement("li")
    li.textContent = message
    document.querySelector(`#${room}`).append(li)
})