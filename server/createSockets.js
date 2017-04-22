var socket = require('socket.io');
var fs = require('fs');
var imageDecoder = require('./imageDecoder');

var Message = require('./db/messageSchema');
var Room = require('./db/roomSchema');

module.exports = function createSockets(server){
  var io = socket(server)
  // and here we are telling our socket to listen for any connections to the
  // server and log a statement whenever a user connects.

  io.on('connection', function(socket) {
    console.log('a user connected')
    socket.on('subscribe', function(data){
      var room = data.room
      socket.join(room)
      console.log('joined room', room)
     }
    )

    socket.on('unsubscribe', function(data){
      var room = data.room
      socket.leave(room)
      console.log('leaving room', room)
    })

    socket.on('disconnect', function(){
      console.log('a user disconnected')
    })

    socket.on('chat message', function(msg){
      console.log('sending message to', msg.room)
      console.log('this message', msg)

      var message = new Message({
        user: msg.user,
        content: msg.message,
        room: msg.room
      })

      message.save(function(err){
          if (err) return err
        })

      io.to(msg.room).emit('chat message', JSON.stringify(msg))
    })

    socket.on('new room', function(roomData){
      var message = new Message({
        user: roomData.user,
        content: roomData.message,
        room: roomData.room
      })

      message.save(function(err){
        if (err) return err
      })

    })

    socket.on('file_upload', function(data, buffer){
      console.log(data)
      var user = data.user
      var fileName = path.join(__dirname, '../public/images', data.file)
      var tmpFileName = path.join('/images', data.file)
      var imageBuffer = imageDecoder(buffer)

      fs.open(fileName, 'a+', (err, fd) => {
        if (err) throw err;

        fs.writeFile(fileName, imageBuffer.data, {encoding: 'base64'}, (err) => {
          fs.close(fd, () => {
            var message = Message({user: user, room: room, image: tmpFileName})

            message.save((err) => {
              if (err) return err
            })
            console.log('file saved successfully!')
          });
        })
      })

      console.log('reached room, sending', fileName)
      io.to(room).emit('file_upload_success', {file: tmpFileName, user: user})
    })
  });
}
