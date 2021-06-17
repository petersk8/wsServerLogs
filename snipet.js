/*
 * This is a method to include in any javascript app 
 * so it can comunicate with the server app running on a machine 
 */
wsLogs(values) {
    /*
     * port is setted on server app (index.js)
     * the ip address of the server where the app is running.
     */
    const WS_CLIENT_ADDRESS = 'ws://192.168.1.33:6565';
    if (WS_CLIENT_ADDRESS) {
        const socket = new WebSocket(WS_CLIENT_ADDRESS);
        socket.onopen = function(e) {
        socket.send(JSON.stringify(values));
        socket.close(1000, 'Deliberate disconnection');
        };
    }
}