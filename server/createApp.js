var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

// routers
var messagesRouter = require('./routes/messages')
var roomsRouter = require('./routes/rooms')

var isDevelopment = process.argv.indexOf('--development') !== -1;

module.exports = function(){
  var app = express()

  // setting index path
  var indexPath = path.join(__dirname, '../public/index.html')
  //setting static path
  var publicPath = express.static('public')

  // enable cross origin resource sharing
  app.use(cors())
  app.use(publicPath)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  //set routing
  app.use(messagesRouter)
  app.use(roomsRouter)

  if (isDevelopment) {
    // use webpack if in development
    var webpack = require('webpack');
    var webpackConfig = require('../webpack.config');

    var compiler = webpack(webpackConfig);
    var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
      hot: true,
      stats: {
        colors: true
      }
    })

    var webpackHotMiddleWare = require('webpack-hot-middleware')(compiler)
    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleWare);

  }

  app.get('/', function (req, res) {
    res.sendFile(indexPath)
  })

  return app
}
