import Player from './Player.js';
import Maze from './Maze.js';
import GameClient from './GameClient.js';

function MazeGame({ ..._ }) {
  this.maze = null;
  this.updates = [];
  this.players = {};
  this.running = false;

  this.client = new GameClient({
    socket: _.socket,
    setInitialGameData: this.setInitialState.bind(this),
    onPlayerMove: this.handleMove.bind(this),
    addPlayer: this.addPlayer.bind(this)
  });
}

MazeGame.prototype.handleMove = function(res) {
  console.log(res);
  debugger;
  this.players[res.id].currentMove = res.move;
};

MazeGame.prototype.setInitialState = function(res) {
  // The game is running once it gets a response from the server
  this.running = true;

  // init main player with initial player data from server
  this.addPlayer({ mainPlayer: true, ...res.entityProps.mainPlayerProps });

  // init each other player in the game instance
  res.entityProps.playersProps.forEach(playerProps => this.addPlayer(playerProps));

  // init the maze
  this.maze = new Maze(res.mazeProps);
};

MazeGame.prototype.addPlayer = function(playerProps) {
  const id = playerProps.id;
  this.players[id] = new Player(playerProps);
};

MazeGame.prototype.update = function() {
  Object.keys(this.players).forEach(id => {
    const update = { ...this.players[id].update(), id }; // merge the id in
    if (update.move) {
      if (this.players[id].isMainPlayer) {
        this.client.sendUpdate('player_move', update);
      }
      this.updates = [...this.updates, update];
    }
  });
};

MazeGame.prototype.draw = function(drawHelpers) {
  this.maze.board.draw(drawHelpers);
  this.updates.reduce((_, update) => update.draw(drawHelpers), []);
};

MazeGame.prototype.updateAndDraw = function(drawHelpers) {
  if (this.running) {
    this.update();
    this.draw(drawHelpers);
  }
};

export default MazeGame;
