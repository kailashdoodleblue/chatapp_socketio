const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketio(server)
// route
app.get('/', (req,res) => {
    res.sendFile(__dirname+ '/indexx.html');
})

// handle socket connection
io.on('connection' , (socket) => {
    console.log('A new user connected');
    // handle incomming message
    socket.on('message', (message) => {
        console.log('Message received: ', message);
        // Brodcast this message to all connected users
        io.emit('message', message)
        
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server listening on PORT 3000');
})