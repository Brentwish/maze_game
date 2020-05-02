import Player from './Player.js';
import Maze from './Maze.js';

const MazeGame = ({ ..._ }) => {
  const client = _.client;
  const player = Player(_.playerProps);
  const maze = Maze(_.mazeProps);
  let running = false;

  const init = () => {
    client.init();
    client.fetch('init_game', {});
    maze.init();
    player.init();
    running = true;
  };

  const update = canvasEngine => {
    player.update();
    maze.board.draw(canvasEngine);
    player.draw(canvasEngine);
  };

  const state = { client, player, maze, running };
  const methods = { init, update };
  return { ...state, ...methods };
};

export default MazeGame;
