/// <reference path="../typings/tsd.d.ts" />

import * as http from "http";
import * as express from "express";
import * as SocketIO from "socket.io";

import PlayerConnection from "./PlayerConnection";
import * as AreaManager from "./AreaManager";

const port = process.env.PORT || 4444;
const app = express();
const server = http.createServer(app);
const io = SocketIO(server);
const tickRate = 20;

export {io};

server.listen(port);
console.log(`Started aurora server on ${port}`);

io.on('connect', (socket) => {
    new PlayerConnection(socket);
});

let tickInterval = setInterval(() => {
    AreaManager.onTick();
}, 1000 / tickRate)
