import Board from './Board.js';

const Maze = ({ ...props }) => {
  const board = Board({});
  const width = board.width;
  const height = board.height;

  const init = () => {
    board.init();
  };

  return { init, board, width, height };
};

export default Maze;
