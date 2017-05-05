var Message = require('../db/messageSchema');
var Room = require('../db/roomSchema');

function messages(socket, io){
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

    socket.emit('chat message', JSON.stringify(msg))
  })

  socket.on('new room', function(roomData){
    // event is named new room but it's creating a new message?
    var message = new Message({
      user: roomData.user,
      content: roomData.message,
      room: roomData.room
    })

    message.save(function(err){
      if (err) return err
    })

  })
}

module.exports = messages
