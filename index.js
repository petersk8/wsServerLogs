const WebSocket = require('ws');
const server = new WebSocket.Server({
  port: 6565,
});

// Get filter words from command line arguments
const filterWords = process.argv[2]
  ? process.argv[2].split(',').map(w => w.trim()).filter(Boolean)
  : [];

let sockets = [];
console.log('Socket Server Running');
console.log('Filter words:', filterWords);

server.on('connection', function (socket) {
  sockets.push(socket);

  // receiving messages
  socket.on('message', function (msg) {
    // Only log messages containing any filter word, or all if no filter
    if (
      filterWords.length === 0 ||
      filterWords.some(word => msg.includes(word))
    ) {
      console.log(getFullTimestamp() + ' - ' + msg);
    }
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
