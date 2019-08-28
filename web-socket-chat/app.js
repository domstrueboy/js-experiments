/* eslint-disable linebreak-style */
const http = require('http');
const fs = require('fs');
const ws = require('ws');

const wss = new ws.Server({ noServer: true });

const clients = new Set();

function onSocketConnect(ws) {
  clients.add(ws);
  console.log('new connection');

  ws.on('message', (message) => {
    console.log(`message received: ${message}`);
    clients.forEach((client) => {
      client.send(
        message.slice(0, 250),
      );
    });
  });

  ws.on('close', () => {
    console.log('connection closed');
    clients.delete(ws);
  });
}

function accept(req, res) {
  if (
    req.url === '/ws' && req.headers.upgrade
    && req.headers.upgrade.toLowerCase() === 'websocket'
    && req.headers.connection.match(/\bupgrade\b/i)
  ) {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url === '/') {
    fs.createReadStream('./index.html').pipe(res);
  } else if (req.url === '/main.js') {
    fs.createReadStream('./main.js').pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
}

http.createServer(accept).listen(8080);
