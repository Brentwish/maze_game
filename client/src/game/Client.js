const Client = socket => {

  const init = () => {
    socket.emit('init_client', { data: 'wat' });
  };

  const fetch = (endpoint, opts) => {
    socket.emit(endpoint, opts);
  };

  return { socket, init, fetch };
};

export default Client;
