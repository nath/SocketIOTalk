const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('./static'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (msg) => {
        console.log(`${msg.name}: ${msg.text}`);
        socket.broadcast.send(msg);
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});
