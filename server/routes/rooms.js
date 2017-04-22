var express = require('express')
var roomsRouter = express.Router()
var Room = require('../db/roomSchema')
var Message = require('../db/messageSchema')

roomsRouter.get('/rooms', function (req, res){
  console.log('in fetch rooms')
  Room.find({}, function (err, docs){
    console.log('docs', docs)
    res.json(docs)
  })
})

roomsRouter.post('/rooms', function (req, res){
  var message = new Message({
    user: req.body.messages[0].user,
    content: req.body.messages[0].content,
    room: req.body.title
  })

  console.log('message', message)

  var room = new Room({
    title: req.body.title
  })

  message.save(function (err){
    if (err) return err
  })

  room.save(function (err) {
    if (err) return err
  })

  res.json(message)
})

module.exports = roomsRouter
