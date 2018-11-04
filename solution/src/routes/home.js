module.exports = ((request, response) => {
  response.writeHead(200, {'Content-type':'text/html'})
  return response.end('<h1>Welcome to the Bear Hunt</h1>')

})