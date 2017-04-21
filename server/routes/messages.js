var express = require('express')
var messagesRouter = express.Router()

messagesRouter.get('/messages', function(req, res){
  Message.find({room: room}, function (err, docs){
    res.json(docs)
  })
})

module.exports = messagesRouter
