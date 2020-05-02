const PLAYER_KEY_DIRS = {
  a: 'left',
  d: 'right',
  s: 'down',
  w: 'up'
};

const Player = ({ ..._ }) => {
  const name = _.name || 'player_1';
  const position = { x: 0, y: 0 };
  let currentMove = '';

  const init = () => {
    console.log('player init');
    setMovementListeners();
  };

  const setMovementListeners = () => {
    document.addEventListener('keypress', e => setCurrentMove(PLAYER_KEY_DIRS[e.key]));
  };

  const setCurrentMove = dir => {
    currentMove = dir;
  };

  const move = () => {
    switch (currentMove) {
      case 'left':
        console.log('player move left');
        // Guard return Validate
        position.x -= 1;
        break;
      case 'right':
        console.log('player move right');
        // Validate and set position
        position.x += 1;
        break;
      case 'down':
        console.log('player move down');
        // Validate and set position
        position.y += 1;
        break;
      case 'up':
        console.log('player move up');
        // Validate and set position
        position.y -= 1;
        break;
      case '':
        break;
      default:
        console.log('invalid move');
    }
    currentMove = '';
  };

  const update = () => {
    move();
  };

  const draw = (ce) => {
    ce.drawSquare(position.x, position.y, ce.randomColor())
  };

  return { name, position, init, draw, update }
};

export default Player;
