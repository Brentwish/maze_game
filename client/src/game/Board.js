const Board = () => {
  let width = 0;
  let height = 0;
  let tiles = [];

  const init = ({ ..._ }) => {
    width = _.width;
    height = _.height;
    tiles = [...Array(width).keys()].map(w => {
      return [...Array(height).keys()].map(h => {
        return Tile({ x: w, y: h });
      });
    })
  };

  const draw = ce => {
    flatTiles().forEach(tile => tile.draw(ce));
  };

  const flatTiles = () => {
    return tiles.reduce((acc, row) => acc.concat(row), []);
  };

  return { tiles, width, height, init, draw, flatTiles };
};

const Tile = ({ ..._ }) => {
  const x = _.x;
  const y = _.y;
  const color = _.color || 'grey';

  const draw = (ce) => {
    ce.drawSquare(x, y, color);
  };

  return { draw };
};

export default Board;
