var socket = require('socket.io');

var subscriptions = require('./sockets/subscriptions')
var messages = require('./sockets/subscriptions')
var fileUpload = require('./sockets/file_upload')

module.exports = function createSockets(server){
  var io = socket(server)
  // and here we are telling our socket to listen for any connections to the
  // server and log a statement whenever a user connects.
  io.on('connection', function(socket) {
    console.log('a user connected')

    subscriptions(socket)
    messages(socket)
    fileUpload(socket, io)
  });

  return io
}
