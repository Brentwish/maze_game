const Client = socket => {

  const init = () => {
    socket.emit('init_client', { data: 'wat' });
  };

  const fetch = (endpoint, opts) => {
    socket.emit(endpoint, opts);
  };

  const joinGame = ({ ...opts }) => {
    socket.emit('join_game', (res) => {
      console.log(res);
    });
  };

  return { socket, init, fetch, joinGame };
};

export default Client;
