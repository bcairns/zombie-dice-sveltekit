/**
 * naive standalone websocket relay server
 *
 * run with `node dev-relay.js`
 *
 * just accepts connections and broadcasts anything incoming to everybody else
 */

import WebSocket, { WebSocketServer } from 'ws';

const port = 8080;

const server = new WebSocketServer({ port });
console.log(`WebSocketServer started and listening on port ${port}`);

server.on('connection', connection => {
    console.log(`New connection (current: ${server.clients.size})`);
    connection.on('message', (data, isBinary) => {
        console.log(`Message received, broadcasting to other clients (${server.clients.size - 1} of ${server.clients.size})`);
        server.clients.forEach( client => {
            if (client !== connection && client.readyState === WebSocket.OPEN){
                client.send(data, { binary: isBinary })
            }
        });
    });

    connection.on('close', () => {
        console.log(`Connection closed (current: ${server.clients.size})`)
    });
});
