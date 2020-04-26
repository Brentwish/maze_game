import Player from './Player.js';

const randomColor = () => {
  const r = 255*Math.random()|0;
  const g = 255*Math.random()|0;
  const b = 255*Math.random()|0;

  return `rgb(${r},${g},${b})`;
};

const drawSquare = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 20, 20);
};

const MazeGame = ({ ...props }) => {
  const client = props.client;
  let player = null;
  let running = false;

  const init = () => {
    client.init();
    client.fetch('init_game', {});
    player = Player(props.playerProps).init();
    running = true;
  };

  const update = (ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);
    drawSquare(ctx, width * Math.random(), height * Math.random(), randomColor());
  };

  const state = { client, player, running };
  const methods = { init, update };
  return { ...state, ...methods };
};

export default MazeGame;
