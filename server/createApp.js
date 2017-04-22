var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var messagesRouter = require('./routes/messages')
var roomsRouter = require('./routes/rooms')

module.exports = function(){
  var app = express()

  // setting index path
  var indexPath = path.join(__dirname, '../public/index.html')
  //setting static path
  var publicPath = express.static('public')

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/public', publicPath)
  app.use(messagesRouter)
  app.use(roomsRouter)

  app.get('/', function (req, res) {
    res.sendFile(indexPath)
  })

  return app
}
