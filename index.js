const WebSocket = require('ws');
const server = new WebSocket.Server({
  port: 6565,
});

let sockets = [];
console.log('Socket Server Running');
server.on('connection', function (socket) {
    //console.log('Socket Server Connected');
  sockets.push(socket);

  // When you receive a message, send that message to every socket.
  socket.on('message', function (msg) {
    //sockets.forEach((s) => s.send(msg));
    console.log(msg);
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', function () {
    sockets = sockets.filter((s) => s !== socket);
  });
});
