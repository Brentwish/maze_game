import Player from './Player.js';
import Maze from './Maze.js';
import GameClient from './GameClient.js';

const MazeGame = ({ ..._ }) => {
  const client = GameClient({ socket: _.socket });
  const player = Player(_.playerProps);
  const maze = Maze();
  let running = false;

  const init = () => {
    client.init({ name: player.name }, res => {
      maze.init(res.mazeData);
      player.init();
      running = true;
    });
  };

  const update = drawHelpers => {
    const update = player.update();
    if (update) {
      client.sendUpdate('player_move', update);
    }
    maze.board.draw(drawHelpers);
    player.draw(drawHelpers);
  };

  const state = { client, player, maze, running };
  const methods = { init, update };
  return { ...state, ...methods };
};

export default MazeGame;
