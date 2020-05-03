import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import * as serviceWorker from './serviceWorker';
import App from './App';
import MazeGame from './game/MazeGame';
import Client from './game/Client';

const port = 8001;
const socket = io.connect(`http://localhost:${port}`);

const props = {
  game: MazeGame({
    client: Client(socket),
    playerProps: { name: 'brent' },
    pixelsPerSquare: 20
  })
};

ReactDOM.render(
  <React.StrictMode>
    <App { ...props } />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
