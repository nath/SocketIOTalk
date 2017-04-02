var socket = io();

const messageBox = $('#messageBox');

$('#sendBtn').click(() => {
    socket.send('I pressed a button');
});

socket.on('message', (msg) => {
    messageBox.append(msg);
});
