import Board from './Board.js';

const Maze = () => {
  const board = Board();

  const init = ({ ..._ }) => {
    board.init({
      width: _.width,
      height: _.height
    });
  };

  return { init, board };
};

export default Maze;
