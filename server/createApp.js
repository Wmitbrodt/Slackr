var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var messagesRouter = require('./routes/messages')
var roomsRouter = require('./routes/rooms')

module.exports = function(){
  const app = express()
  const indexPath = path.join(__dirname, '/../public/index.html')
  const publicPath = express.static(path.join(__dirname, '../public'))

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/public', publicPath)
  app.use('/messages', messagesRouter)
  app.use('/rooms', roomsRouter)

  app.get('/', function (req, res) {
    res.sendFile(indexPath)
  })

  return app
}
