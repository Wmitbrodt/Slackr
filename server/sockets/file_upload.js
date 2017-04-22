var fs = require('fs');
var path = require('path')
var Message = require ('../db/messageSchema')
var imageDecoder = require('../imageDecoder');

function fileUpload(socket, io){
  // File uploading is broken as you aren't providing the sockets
  // with the necessary info
  // src/components/fileUpload.js line32 -- you need to add the room to the params
  socket.on('file_upload', function(data, buffer){
    var user = data.user
    var fileName = path.join(__dirname, '..', '..', 'public', 'images', data.file)
    var tmpFileName = path.join('/images', data.file)
    var imageBuffer = imageDecoder(buffer)

    fs.open(fileName, 'a+', (err, fd) => {
      if (err) throw err;

      fs.writeFile(fileName, imageBuffer.data, {encoding: 'base64'}, (err) => {
        fs.close(fd, () => {
          var message = Message({
            user: user,
            room: room,
            image: tmpFileName
          })

          message.save((err) => {
            if (err) return err
          })
          console.log('file saved successfully!')
        });
      })
    })

    console.log('reached room, sending', fileName)
    io.to(data.room).emit('file_upload_success', {file: tmpFileName, user: user})
  })
}

module.exports = fileUpload
