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

let currentGame = null;
const mazeProps = {
  width: 100,
  height:100
};

io.on('connection', socket => {
  console.log(`client connected: ${socket.id}`);

  socket.on('init_client', data => {
    console.log('init_client: ', data);

    if (currentGame === null) currentGame = MazeGame(mazeProps);

    currentGame.addPlayer(socket, data)
  });

  socket.on('init_game', data => {
    console.log('init_game: ', data);
  });

  socket.on('disconnect', () => {
    console.log(`client disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
