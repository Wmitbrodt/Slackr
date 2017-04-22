var express = require('express')
var messagesRouter = express.Router()
var Message = require('../db/messageSchema')

messagesRouter.get('/messages', function(req, res){
  // what room are you trying to pull from?

  Message.find({room: "general"}, function (err, docs){
    res.json(docs)
  })
})

module.exports = messagesRouter
