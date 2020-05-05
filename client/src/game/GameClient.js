function GameClient({ ..._ }) {
  this.socket = _.socket;

  // Set up listeners

  // Fetch the initial data for the game
  this.socket.emit('init_client', {}, res => _.setInitialGameData({
    mazeProps: res.maze_data,
    entityProps: {
      mainPlayerProps: {},
      playersProps: res.players,
      npcs: res.npcs
    }
  }));
}

GameClient.prototype.sendUpdate = function(type, { ...opts }) {
  this.socket.emit(type, opts, res => {
    if (typeof opts.callback === 'function') opts.callback(res);
  });
};

export default GameClient;
