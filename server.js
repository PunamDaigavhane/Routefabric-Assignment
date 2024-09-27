const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for text messages
    socket.on('textMessage', (data) => {
        io.emit('textMessage', data); // Broadcast text message to all connected clients
    });

    // Listen for file messages
    socket.on('fileMessage', (data) => {
        io.emit('fileMessage', data); // Broadcast file message to all connected clients
    });

    // Listen for audio messages
    socket.on('audioMessage', (data) => {
        io.emit('audioMessage', data); // Broadcast audio message to all connected clients
    });

    // Listen for video messages
    socket.on('videoMessage', (data) => {
        io.emit('videoMessage', data); // Broadcast video message to all connected clients
    });

    // Handle call offer
    socket.on('call', (data) => {
        socket.broadcast.emit('call', data);
    });

    // Handle call answer
    socket.on('answer', (data) => {
        socket.broadcast.emit('answer', data);
    });

    // Handle ICE candidates
    socket.on('iceCandidate', (data) => {
        socket.broadcast.emit('iceCandidate', data);
    });

    // Handle hangup
    socket.on('hangup', () => {
        socket.broadcast.emit('hangup');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
