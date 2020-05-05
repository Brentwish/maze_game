function Tile({ ..._ }) {
  this.x = _.x;
  this.y = _.y;
  this.color = _.color || 'grey';
}

Tile.prototype.draw = function(ce) {
  ce.drawSquare(this.x, this.y, this.color);
};

export default Tile;
