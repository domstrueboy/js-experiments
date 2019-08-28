/* eslint-disable linebreak-style */
// const url = location.host === 'localhost' ? 'ws://localhost:8080/ws' : 'wss://some-address.com/ws';
const url = 'ws://localhost:8080/ws';

const socket = new WebSocket(url);

function showMessage(message) {
  const messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}

document.forms.publish.onsubmit = function () {
  socket.send(this.message.value);
  return false;
};

socket.onmessage = (event) => {
  showMessage(event.data);
};

socket.onclose = event => console.log(`Closed ${event.code}`);
