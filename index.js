const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = 8001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server).listen(server);

const mazeProps = {
  width: 25,
  height: 25
};

const players = {};
const npcs = [];

io.on('connection', socket => {
  console.log(`client connected: ${socket.id}`);

  socket.on('init_client', (data, callback) => {
    console.log('init_client: ', socket.id);
    if (socket.id in players) return;
    players[socket.id] = { id: Object.keys(players).length };
    callback({ maze_data: mazeProps, players: Object.values(players), npcs });
  });

  socket.on('player_move', (data, callback) => {
    console.log('player_move: ', data);
    // Apply the move
    socket.broadcast.emit('player_move', data);
    callback({ valid: true });
  });

  socket.on('disconnect', () => {
    console.log(`client disconnected: ${socket.id}`);
    delete players[socket.id];
    console.log('players left:');
    console.log(players);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
