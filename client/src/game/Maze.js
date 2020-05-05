import Board from './Board.js';

function Maze({ ..._ }) {
  this.board = new Board({
    width: _.width,
    height: _.height
  });
}

export default Maze;
