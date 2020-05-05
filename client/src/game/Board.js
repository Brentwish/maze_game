import Tile from './Tile.js';

function Board({ ..._ }) {
  this.width = _.width;
  this.height = _.height;
  this.tiles = [...Array(this.width).keys()].map(w => {
    return [...Array(this.height).keys()].map(h => {
      return new Tile({ x: w, y: h });
    });
  });
}

Board.prototype.flatTiles = function() {
  return this.tiles.reduce((acc, row) => acc.concat(row), []);
};

Board.prototype.draw = function(ce) {
  this.flatTiles().forEach(tile => tile.draw(ce));
};

export default Board;
