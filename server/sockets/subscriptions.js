function subscriptions(socket, io){
  socket.on('subscribe', function(data){
    var room = data.room
    socket.join(room)
    console.log('joined room', room)
   }
  )

  socket.on('unsubscribe', function(data){
    console.log('leaving room', data)
    if(data){
      var room = data.room
      socket.leave(room)

    }
  })

  socket.on('disconnect', function(){
    console.log('a user disconnected')
  })
}

module.exports = subscriptions
