const GameClient = ({ ..._ }) => {
  const socket = _.socket;

  const init = ({ ...props }, callback) => {
    socket.emit('init_client', props, res => callback({ mazeData: res.maze_data }));
  };

  const fetch = (endpoint, opts) => {
    socket.emit(endpoint, opts);
  };

  const sendUpdate = (type, { ...opts }) => {
    socket.emit(type, opts, res => {
      if (typeof opts.callback === 'function') opts.callback(res);
    });
  };

  return { init, fetch, sendUpdate };
};

export default GameClient;
