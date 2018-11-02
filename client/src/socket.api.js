import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

export default class SocketApi {
  static subscribeToMessages(cb) {
    socket.on('chat message', cb);
  }

  static emitMessage(msgData) {
    socket.emit('chat message', msgData);
  }
}