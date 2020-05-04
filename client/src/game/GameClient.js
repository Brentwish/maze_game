const GameClient = ({ ..._ }) => {
  const socket = _.socket;

  const init = ({ ...props }, callback) => {
    socket.emit('init_client', props, res => callback({
      mazeData: res.maze_data,
      entities: {
        mainPlayerProps: {},
        playersProps: res.players,
        npcs: res.npcs
      }
    }));
  };

  const sendUpdate = (type, { ...opts }) => {
    socket.emit(type, opts, res => {
      if (typeof opts.callback === 'function') opts.callback(res);
    });
  };

  return { init, sendUpdate };
};

export default GameClient;
