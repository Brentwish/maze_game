import Player from './Player.js';
import Maze from './Maze.js';
import GameClient from './GameClient.js';

const MazeGame = ({ ..._ }) => {
  const client = GameClient({socket: _.socket});
  const maze = Maze();
  let updates = [];
  let players = [];
  let running = false;

  const init = () => {
    client.init({}, res => {
      // init main player with initial player data from server
      addPlayer({ mainPlayer: true, ...res.entities.mainPlayerProps });

      // init each other player in the game instance
      res.entities.playersProps.forEach(playerProps => addPlayer(playerProps));

      // init the maze
      maze.init(res.mazeData);
      running = true;
    });
  };

  const addPlayer = playerProps => {
    const player = Player();

    player.init(playerProps);
    players = [...players, player];
  };

  const update = () => {
    players.forEach(player => {
      const update = player.update();
      if (update) {
        debugger;
        if (player.isMainPlayer) {
          client.sendUpdate('player_move', update);
        }
        updates = [...updates, update];
      }
    });
  };

  const draw = drawHelpers => {
    maze.board.draw(drawHelpers);
    updates.reduce((_, update) => update.draw(drawHelpers), []);
  };

  const updateAndDraw = drawHelpers => {
    update();
    draw(drawHelpers);
  };

  return { init, updateAndDraw };
};

export default MazeGame;
