const WebSocket = require('ws');
const server = new WebSocket.Server({
  port: 6565,
});

let sockets = [];
console.log('Socket Server Running');
server.on('connection', function (socket) {
    //console.log('Socket Server Connected');
  sockets.push(socket);

  // receiving messages
  socket.on('message', function (msg) {
    //sockets.forEach((s) => s.send(msg));
    console.log(getFullTimestamp() + ' - ' + msg);
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', function () {
    sockets = sockets.filter((s) => s !== socket);
  });
});

function getFullTimestamp () {
  const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();
  return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(),3)}`;
}
