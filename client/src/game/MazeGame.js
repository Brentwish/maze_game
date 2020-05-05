import Player from './Player.js';
import Maze from './Maze.js';
import GameClient from './GameClient.js';

function MazeGame({ ..._ }) {
  this.maze = null;
  this.updates = [];
  this.players = [];
  this.running = false;

  this.client = new GameClient({
    socket: _.socket,
    setInitialGameData: this.setInitialState.bind(this)
  });
}

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
  this.players = [...this.players, new Player(playerProps)];
};

MazeGame.prototype.update = function() {
  this.players.forEach(player => {
    const update = player.update();
    if (update.move) {
      if (player.isMainPlayer) {
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
