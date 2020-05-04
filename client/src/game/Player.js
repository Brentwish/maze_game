const PLAYER_KEY_DIRS = {
  a: 'left',
  d: 'right',
  s: 'down',
  w: 'up'
};

function Player({ ...playerProps }) {
  this.name = playerProps.name || 'player';
  this.position = { x: 0, y: 0 };
  this.currentMove = '';
  this.isMainPlayer = false;

  if (playerProps.mainPlayer) {
    this.isMainPlayer = true;
    document.addEventListener('keypress', e => this.currentMove = PLAYER_KEY_DIRS[e.key]);
  }
}

Player.prototype.move = function() {
  const update = { move: this.currentMove };
  const newPosition = this.position;

  switch (this.currentMove) {
    case 'left':
      newPosition.x -= 1;
      break;
    case 'right':
      newPosition.x += 1;
      break;
    case 'down':
      newPosition.y += 1;
      break;
    case 'up':
      newPosition.y -= 1;
      break;
    case '':
      return false;
    default:
      console.log('invalid move');
      return false;
  }

  console.log(`player move ${this.currentMove}`);
  this.currentMove = '';
  this.position = newPosition;
  return update;
};

Player.prototype.update = function() {
  return { move: this.move(), draw: this.draw.bind(this) };
};

Player.prototype.draw = function(ce) {
  ce.drawSquare(this.position.x, this.position.y, ce.randomColor())
};

export default Player;
