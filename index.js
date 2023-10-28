const express = require("express")
const app = express()

const WebSocket = require("express-ws")(app)
const wss = WebSocket.getWss()
const PORT = process.env.PORT || 5000

app.ws("/", (ws, req) => {
    ws.on("message", (msg) => {
        msg = JSON.parse(msg)

        if (msg.type === "join") {
            connectionHandler(ws, msg)
        }

        if (msg.type === "draw") {
            broadcastConnections(ws, msg)
        }
    })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnections(ws, msg)
}

const broadcastConnections = (ws, msg) => {
    const clients = wss.clients

    clients.forEach((client) => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}