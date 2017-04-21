'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _messageSchema = require('./db/messageSchema');

var _messageSchema2 = _interopRequireDefault(_messageSchema);

var _roomSchema = require('./db/roomSchema');

var _roomSchema2 = _interopRequireDefault(_roomSchema);

var _mongodb = require('mongodb');

var _serveStatic = require('serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _imageDecoder = require('./imageDecoder');

var _imageDecoder2 = _interopRequireDefault(_imageDecoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var port = 5000;
var app = (0, _express2.default)();
var server = (0, _http.Server)(app);
var compiler = (0, _webpack2.default)(config);
// Here we are defining a variable io, setting it equal to a new instance of
// socket.io by passing it the server to listen on.

var io = (0, _socket2.default)(server);
var staticPath = _path2.default.join(__dirname, '..', '/public');

var room;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use((0, _serveStatic2.default)(staticPath));

app.get('/messages', function (req, res) {
  _messageSchema2.default.find({ room: room }, function (err, docs) {
    res.json(docs);
  });
});

app.get('/rooms', function (req, res) {
  console.log('in fetch rooms');
  _roomSchema2.default.find({}, function (err, docs) {
    console.log('docs', docs);
    res.json(docs);
  });
});

app.post('/rooms', function (req, res) {
  var message = new _messageSchema2.default({
    user: req.body.messages[0].user,
    content: req.body.messages[0].content,
    room: req.body.title
  });

  console.log('message', message);

  var room = new _roomSchema2.default({
    title: req.body.title
  });

  message.save(function (err) {
    if (err) return err;
  });

  room.save(function (err) {
    if (err) return err;
  });

  res.json(message);
});

app.get('/', function (req, res) {
  console.log('get route caught this');
  res.sendFile(_path2.default.join(__dirname, '../dist/index.html'));
});

// and here we are telling our socket to listen for any connections to the
// server and log a statement whenever a user connects.

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('subscribe', function (data) {
    room = data.room;
    socket.join(room);
    console.log('joined room', room);
  });

  socket.on('unsubscribe', function () {
    socket.leave(room);
    console.log('leaving room', room);
  });

  socket.on('disconnect', function () {
    console.log('a user disconnected');
  });

  socket.on('chat message', function (msg) {
    console.log('sending message to', msg.room);
    console.log('this message', msg);

    var message = new _messageSchema2.default({
      user: msg.user,
      content: msg.message,
      room: msg.room
    });

    message.save(function (err) {
      if (err) return err;
    });

    io.to(msg.room).emit('chat message', JSON.stringify(msg));
  });

  socket.on('new room', function (roomData) {
    var message = new _messageSchema2.default({
      user: roomData.user,
      content: roomData.message,
      room: roomData.room
    });

    message.save(function (err) {
      if (err) return err;
    });
  });

  socket.on('file_upload', function (data, buffer) {
    console.log(data);
    var user = data.user;
    var fileName = _path2.default.join(__dirname, '../public/images', data.file);
    var tmpFileName = _path2.default.join('/images', data.file);
    var imageBuffer = (0, _imageDecoder2.default)(buffer);

    _fs2.default.open(fileName, 'a+', function (err, fd) {
      if (err) throw err;

      _fs2.default.writeFile(fileName, imageBuffer.data, { encoding: 'base64' }, function (err) {
        _fs2.default.close(fd, function () {
          var message = (0, _messageSchema2.default)({ user: user, room: room, image: tmpFileName });

          message.save(function (err) {
            if (err) return err;
          });
          console.log('file saved successfully!');
        });
      });
    });

    console.log('reached room, sending', fileName);
    io.to(room).emit('file_upload_success', { file: tmpFileName, user: user });
  });
});

_mongoose2.default.connect(process.env['DB_HOST']);
var db = _mongoose2.default.connection;

db.once('open', function () {
  server.listen(port, function (err) {
    if (err) {
      console.log(err);
    } else {
      (0, _open2.default)('http://localhost:' + port);
    }
  });
});