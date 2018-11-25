const path = require('path')
const fs = require('fs')

module.exports = ((request, response) => {
  const pathToBearOne = path.join(__dirname, '..', 'woods', 'bear_one.jpg')
  fs.readFile(pathToBearOne, (err, file) => {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/plain' })
      response.end('Sorry, the server broke...')
      return
    }
    response.writeHead(200, { 'Content-Type': 'image/jpeg' })
    response.end(file)
  })
})