const WebSocket = require('ws');
const {WebSocketServer} = require('ws');

const wss = new WebSocketServer({port: 8081});

function heartbeat() {
    this.isAlive = true;
}
wss.on('connection', function connection(ws) {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary) {
        console.log('received: %s', data);
        console.log('isBinary', isBinary);

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: isBinary});
            }
        });
    });

    ws.send(JSON.stringify({
        type: 'system',
        data: 'connected'
    }));
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

// todo: does it work?
wss.on('close', function close() {
    clearInterval(interval);
    console.log('close');
});