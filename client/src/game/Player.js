const PLAYER_KEY_DIRS = {
  a: 'left',
  d: 'right',
  s: 'down',
  w: 'up'
};

const Player = () => {
  let name = '';
  let position = { x: 0, y: 0 };
  let currentMove = '';
  let isMainPlayer = false;

  const init = ({ ...playerProps }) => {
    name = playerProps.name || 'player';
    position = { x: 0, y: 0 };

    if (playerProps.mainPlayer) {
      isMainPlayer = true;
      document.addEventListener('keypress', e => currentMove = PLAYER_KEY_DIRS[e.key]);
    }
  };

  const move = () => {
    const update = { move: currentMove };
    const newPosition = position;

    switch (currentMove) {
      case 'left':
        console.log('player move left');
        // Guard return Validate
        newPosition.x -= 1;
        break;
      case 'right':
        console.log('player move right');
        // Validate and set position
        newPosition.x += 1;
        break;
      case 'down':
        console.log('player move down');
        // Validate and set position
        newPosition.y += 1;
        break;
      case 'up':
        console.log('player move up');
        // Validate and set position
        newPosition.y -= 1;
        break;
      case '':
        return false;
      default:
        console.log('invalid move');
        return false;
    }

    currentMove = '';
    position = newPosition;
    return update;
  };

  const update = () => {
    return { move: move(), draw };
  };

  const draw = (ce) => {
    ce.drawSquare(position.x, position.y, ce.randomColor())
  };

  return { isMainPlayer, init, draw, update }
};

export default Player;
