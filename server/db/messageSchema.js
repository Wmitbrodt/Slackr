var mongoose = require('mongoose')
// import imageSchema from './imageSchema'

var imageSchema = mongoose.Schema({
   data: String,
   contentType: String
})

var messageSchema = mongoose.Schema({
  user: String,
  content: String,
  room: String,
  image: String
})

module.exports = mongoose.model('Message', messageSchema)
