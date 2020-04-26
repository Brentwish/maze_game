const PLAYER_KEY_DIRS = {
  a: 'left',
  d: 'right',
  s: 'down',
  w: 'up'
};

const Player = ({ ...props }) => {
  const name = props.name || 'player_1';

  const init = () => {
    console.log('player init');
    setMovementListeners();
  };

  const setMovementListeners = () => {
    document.addEventListener('keypress', e => move(PLAYER_KEY_DIRS[e.key]));
  };

  const move = dir => {
    switch(dir) {
      case 'left':
        console.log('player move left');
        // Validate and set position
        break;
      case 'right':
        console.log('player move right');
        // Validate and set position
        break;
      case 'down':
        console.log('player move down');
        // Validate and set position
        break;
      case 'up':
        console.log('player move up');
        // Validate and set position
        break;
      default:
        console.log('invalid move');
    }
  };

  return { name, init }
};

export default Player;
