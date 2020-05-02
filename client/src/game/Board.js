import Player from "./Player";

const Board = ({ ..._ }) => {
  const width = _.width;
  const height = _.height;

  let tiles = [];

  const init = () => {
    tiles = [...Array(width).keys()].map(w => {
      return [...Array(height).keys()].map(h => {
        return Tile({ x: w, y: h });
      });
    })
  };

  const draw = (ce) => {
    tiles.forEach(row => {
      row.forEach(tile => {
        tile.draw(ce);
      });
    })
  };

  return { tiles, width, height, init, draw };
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
