// server
var express = require('express');
var path = require('path');
var open = require('open');
var socket = require('socket.io');
var bodyParser = require('body-parser');
var Server = require('http').Server;

// db code
var mongoose = require('mongoose');
var Binary = require('mongodb').Binary;

//webpack
var webpack = require('webpack');
var config = require('../webpack.config.dev.js');

// function takes server as an argument returns configured sockets instance
var createSockets = require('./createSockets')
// function returns configured express instance
var createApp = require('./createApp.js')

// load env variables
require('dotenv').config()

var app = createApp()
var server = Server(app)

// Here we are defining a variable io, setting it equal to a new instance of
// socket.io by passing it the server to listen on.
var io = createSockets(server)

//serve up assets
var port = 5000;

mongoose.connect(process.env['DB_HOST'])
var db = mongoose.connection;

db.once('open', () => {
 server.listen(port, function(err) {
   if (err) {
     console.log(err);
   } else {
     open(`http://localhost:${port}`);
  }
});


})
