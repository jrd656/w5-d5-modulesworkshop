// import path & url & fs & querystring
const path = require('path')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')


module.exports = ((request, response) => {

  // Object deconstruction to get keys and values 
  const { query } = url.parse(request.url)
  const { bear } = qs.parse(query)

  // Check query exists
  if (!bear) {
    response.writeHead(400, { 'Content-Type': 'text/plain' })
    response.end('`bear` parameter required')
    return
  }

  // Check the query matches one of our files
  const bearWhiteList = ['one', 'two', 'three', 'four']

  if (!bearWhiteList.includes(bear)) {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('No bear found!')
    return
  }

  // Read the file asynchronously, handle a file read error or send the file
  const fileName = `bear_${bear}.jpg`
  const filePath = path.join(__dirname, '..', 'woods', fileName)
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/plain' })
      response.end('Sorry, server done broke')
      return
    }
    response.writeHead(200, { 'Content-Type': 'image/jpeg' })
    response.end(file)
  })
})