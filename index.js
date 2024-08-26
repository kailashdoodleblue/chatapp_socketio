const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = socketio(server)
io.listen(server)
app.get('/', (req,res) => {
    res.sendFile(__dirname+ '/index.html');
})

io.on('connection' , (socket) => {
    console.log('A new user connected');
    socket.on('message', (message) => {
        console.log('Message received: ', message);
        io.emit('message', message)
        
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server listening on PORT 3000');
})