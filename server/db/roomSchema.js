var mongoose = require('mongoose')

var roomSchema = mongoose.Schema({
  title: String
})

module.exports = mongoose.model('Room', roomSchema)
