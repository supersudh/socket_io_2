const conns = [];
module.exports = app => {
  const io = require('socket.io')(app);
  io.on('connection', function (socket) {
    console.log('a user connected', socket.id);
    if (conns.length === 0) {
      conns.push(socket.id);
    }
    socket.on('disconnect', function () {
      console.log('user disconnected', socket.id);
    });

    // socket.on('subscribeToChatMessage', function() {
    //   socket.emit();
    // });

    socket.on('chat message', function (msg) {
      io.to('conns[0]').emit('chat message', msg);
      console.log(msg);
      // io.emit('chat message', msg);
      console.log(conns)
    });
  });
};
