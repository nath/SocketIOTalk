var socket = io();

const messageBox = $('#messageBox');
const msgBox = $('#msgBox');
const name = prompt('What is your name?');

$('form').submit(() => {
    const msgText = msgBox.val();
    if (msgText === '') {
        return;
    }

    const msg = {
        name: name,
        text: msgText
    }

    addMessage(msg);
    socket.send(msg);

    msgBox.val('');

    return false;
});


function addMessage(msg) {
    messageBox.append(`<div class="message">${msg.name}: ${msg.text}</div>`);
}

socket.on('message', (msg) => {
    addMessage(msg);
});

socket.on('count', (count) => {
    $('#count').text(count);
});
