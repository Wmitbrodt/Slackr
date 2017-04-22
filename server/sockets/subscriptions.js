function subscriptions(socket){
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
}

module.exports = subscriptions
