const express = require('express');
const WebSocketServer = require('uws').Server;
const { json } = require('body-parser');
const { info } = require('./helpers/logger');
const { port, socketPort, staticPath, isProduction, version } = require('./config');

const server = express();
const WSServer = new WebSocketServer({ port: socketPort });

let onlineUsers = {};

function _getNewUserId() {
    for (let i = 0; true ;i++) {
        if (!onlineUsers[i]) {
            return i;
        }
    }
}

info(`---------------------CHAT SERVER v${version}---------------------`);
server.use(express.static(staticPath));
info(`Static is used from ${staticPath}`);
info(`Running in ${isProduction ? 'PRODUCTION' : 'DEV'} mode`);
server.use(json());
server.listen(port, () => {
    info(`Server was started on port ${port}`);
    info(`WebSocket server was started on port ${socketPort}`);
    info('------------------------------------------------------------');
    WSServer.on('connection', (ws) => {
        let id = _getNewUserId();
        onlineUsers[id] = ws;

        info('user connected');
        ws.on('message', (message) => {
            info('received', message);

            for (let key in onlineUsers) {
                onlineUsers[key].send(message);
            }
        });

        ws.on('close', () => {
            info(`connection ${id} closed.`);
            delete onlineUsers[id];
        });
    });
});
