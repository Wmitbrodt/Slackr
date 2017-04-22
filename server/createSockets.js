var socket = require('socket.io');

var subscriptions = require('./sockets/subscriptions')
var messages = require('./sockets/messages')
var fileUpload = require('./sockets/file_upload')

module.exports = function createSockets(server){
  var io = socket(server)
  // messages()

  // and here we are telling our socket to listen for any connections to the
  // server and log a statement whenever a user connects.
  io.on('connection', function(socket) {
    console.log('a user connected')
    subscriptions(socket, io)
    messages(socket, io)
    fileUpload(socket, io)
  });

  return io
}
