'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageSchema = _mongoose2.default.Schema({
  data: String,
  contentType: String
});

var messageSchema = _mongoose2.default.Schema({
  user: String,
  content: String,
  room: String,
  image: String
});

exports.default = _mongoose2.default.model('Message', messageSchema);