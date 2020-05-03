import Player from './Player.js';
import Maze from './Maze.js';

const MazeGame = ({ ..._ }) => {
  const client = _.client;
  const player = Player(_.playerProps);
  const maze = Maze({});
  let running = false;

  const init = () => {
    client.init();
    client.joinGame({ name: player.name });
    maze.init();
    player.init();
    running = true;
  };

  const update = drawHelpers => {
    player.update();
    maze.board.draw(drawHelpers);
    player.draw(drawHelpers);
  };

  const state = { client, player, maze, running };
  const methods = { init, update };
  return { ...state, ...methods };
};

export default MazeGame;
