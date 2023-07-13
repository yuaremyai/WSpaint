import express from "express"
import WSserver from "express-ws"


const app = express()
const server = WSserver(app)
const aWss = server.getWss()
const PORT = 5000



app.ws('/', baseURL )
function baseURL(ws, request) {
    ws.send('connected')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        console.log(msg)

        switch(msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
        }
    })
}

app.listen(PORT, () => { console.log(`App run on port ${PORT}`) })

function connectionHandler(ws, msg) {
    ws.id = msg.id
    broadcastHandler(ws, msg)
}

function broadcastHandler(ws, msg) {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send('user connected')
        }
    })
}