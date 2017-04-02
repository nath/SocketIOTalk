var socket = io();

const inbox = $('#inbox');
const msgBox = $('#msgBox');
const name = prompt('What is your name?');

msgBox.select();

function sendMessage() {
    const msgText = msgBox.val().trim();
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
}

$('form').submit(sendMessage);

msgBox.keydown((e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

//escape html taken from underscore js

let htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

var htmlEscaper = /[&<>"'\/]/g;

function escape(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};

function addMessage(msg) {
    let shouldScroll = inbox[0].scrollHeight - inbox.scrollTop() - inbox.outerHeight() < 1;

    msg.text = escape(msg.text.trim()).replace(/\n/, '<br>');
    inbox.append(`<div class="message"><span class="name">${msg.name}:</span> <span class="text">${msg.text}</span></div>`);

    if (shouldScroll) {
        inbox.scrollTop(inbox[0].scrollHeight);
    }
}

socket.on('message', (msg) => {
    addMessage(msg);
});

socket.on('count', (count) => {
    $('#count').text(count);
});
