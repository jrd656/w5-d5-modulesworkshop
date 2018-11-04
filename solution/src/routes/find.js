const path = require('path')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')

const returnBear = ((request, response, bear) => {
  const imgPath = path.join(__dirname,'..', 'woods', bear)
  const image = fs.readFileSync(imgPath)
  response.writeHead(200, {'Content-type':'image/jpg'})
  return response.end(image)
})

module.exports = ((request, response) => {
  const { query } = url.parse(request.url)
  const { bear } = querystring.parse(query)
  
  if (!bear) {
    response.writeHead(400)
    return response.end('Search criteria cannot be found!')
  }
  switch (bear){
    case `one`:
      return returnBear(request, response, 'bear_one.jpg')

    case `two`:
      return returnBear(request, response, 'bear_two.jpg')

    case `three`:
    return returnBear(request, response, 'bear_three.jpg')

    case `four`:
      return returnBear(request, response, 'bear_four.jpg')

    default:
      response.writeHead(400)
      return response.end('Search criteria cannot be found!')
  }
})