module.exports = ((request, response) => {
  response.writeHead(404)
  return response.end('Cannot be found!')
})