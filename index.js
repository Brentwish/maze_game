const Player = ({ props }) => {
  return { props };
};

const MazeGame = ({ ...props }) => {
  let players = [];

  const addPlayer = (socket, props) => {
    const player = Player(props);
    players = [...players, player];

    socket.on('move', data => {
      const move = processMoveData(data);

      if (move.isValid()) {
        player.move(move);
      }
    });

    return true;
  };

  const processMoveData = () => { return { isValid: () => true }; };

  return { props, addPlayer };
};

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

const players = [];
const npcs = [];

io.on('connection', socket => {
  console.log(`client connected: ${socket.id}`);

  socket.on('init_client', (data, callback) => {
    console.log('init_client: ', data);
    callback({ maze_data: mazeProps, players, npcs });
  });

  socket.on('player_move', (data, callback) => {
    console.log('player_move: ', data);
    // Apply the move
    callback({ valid: true });
  });

  socket.on('disconnect', () => {
    console.log(`client disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
