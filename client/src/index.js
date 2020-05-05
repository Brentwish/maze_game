import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import * as serviceWorker from './serviceWorker';
import App from './App';
import MazeGame from './game/MazeGame';

const socket = io.connect('http://localhost:8001');
const game = new MazeGame({
  socket,
  playerProps: { name: 'brent' }
});

ReactDOM.render(
  <React.StrictMode>
    <App game={game} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
