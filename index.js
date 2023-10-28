const express = require("express")
const app = express()

const WebSocket = require("express-ws")(app)
const PORT = process.env.PORT || 5000

app.ws("/", (ws, req) => {
    ws.on("message", (msg) => {
        console.log(msg)
        ws.send("Hello from server")
    })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))