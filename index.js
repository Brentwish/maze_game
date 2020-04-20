const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const port = process.env.PORT || 3001;
const index = require(path.join(__dirname + '/index.html'));
const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

server.listen(port, () => console.log(`Listening on port ${port}`));
