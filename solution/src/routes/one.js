const path = require('path')
const fs = require('fs')

module.exports = ((request, response) => {
  const imgPath = path.join(__dirname,'..', 'woods', 'bear_one.jpg')
  const image = fs.readFileSync(imgPath)
  response.writeHead(200, {'Content-type':'image/jpg'})
  return response.end(image)
})