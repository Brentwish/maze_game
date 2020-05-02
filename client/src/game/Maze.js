import Board from './Board.js';

const Maze = ({ ...props }) => {
  const board = Board(props.boardProps);

  const init = () => {
    board.init();
  };

  return { init, board };
};

export default Maze;
