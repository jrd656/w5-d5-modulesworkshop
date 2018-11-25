// import request module
const requester = require('request')
const qs = require('querystring')
const http = require('http')

// dotenv will read a .env file into your process.env
require('dotenv').config()

const requestModule = (request, response) => {
  // use querystring module to convert object into a query
  const queryString = qs.stringify({ api_key: process.env.API_KEY, tag: 'bear' })

  //construct url
  const randomGifAPIUrl = `http://api.giphy.com/v1/gifs/random?${queryString}`

  //use the request module to make API call
  requester.get(randomGifAPIUrl, (err, res, body) => {

    // check for error AND correct status code AND content type
    const { statusCode, headers } = res
    const contentType = headers['content-type']
    if (err || statusCode !== 200 || contentType !== 'application/json') {
      // log the errors on the server
      console.log(`Error ${err}`)
      console.log(`Status Code: ${statusCode}`)
      console.log(`Content Type: ${contentType}`)
      // send a response back to the client
      response.writeHead(500, { 'content-type': 'text/plain' })
      response.end('Sorry, there was a server error')
      return
    }

    // if above is ok, then parse the response body and put into img element
    const { data } = JSON.parse(body)
    const imgHtml = `<img src=${data.image_original_url} />`
    response.writeHead(200, { 'content-type': 'text/html' })
    response.end(imgHtml)
  })

}

const myRequestModule = (request, response) => {
  // Same as for request module
  const queryString = qs.stringify({ api_key: process.env.API_KEY, tag: 'bear' })
  const randomGifAPIUrl = `http://api.giphy.com/v1/gifs/random?${queryString}`

  // use http to make a get request - note, we will recieve a stream in the callback NOT error first + results
  http.get(randomGifAPIUrl, httpResponse => {

    // Check for status code and content type
    const statusCode = httpResponse.statusCode;
    const contentType = httpResponse.headers['content-type'];
    if (statusCode !== 200 || contentType !== 'application/json') {
      console.log(`Status Code: ${statusCode}`)
      console.log(`Content Type: ${contentType}`)
      response.writeHead(500, { 'content-type': 'text/plain' })
      response.end('Sorry, there was a server error ')

      // consume response data to free up memory (from http docs)
      httpResponse.resume();

      // this return takes us out of the callback
      return
    }

    // From http docs:
    // By default, no encoding is assigned and stream data will be returned as // Buffer objects. Setting an encoding causes the stream data to be  
    // returned as strings of the specified encoding rather than as Buffer 
    // objects. 
    httpResponse.setEncoding('utf8');

    // As we get back a stream, we need to collect the chunks of data when they come through
    let rawData = '';
    httpResponse.on('data', chunk => rawData += chunk);

    // When the data ends, the same as for request module
    httpResponse.on('end', () => {
      const { data } = JSON.parse(rawData);
      const imgHtml = `<img src=${data.image_original_url} />`
      response.writeHead(200, { 'content-type': 'text/html' })
      response.end(imgHtml)
    });
    // We need to listen here for an error in the request itself
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    response.writeHead(500, { 'content-type': 'text/plain' })
    response.end('Sorry, there was a server error ')
  });
}

// uncomment the handler you want to use:

module.exports = (requestModule)
// module.exports = (myRequestModule)