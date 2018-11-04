// wuth request module
// const requestModule = require('request')
// const apiKey = 'ADD YOUR API KEY HERE'

// module.exports = ((request, response) => {
//   requestModule(`http://api.giphy.com/v1/gifs/random?tag=bear&api_key=${apiKey}`, function(err, res, body) {  
//     const { data } = JSON.parse(body)
//     if (err){
//       response.writeHead(500)
//       return response.end(`Sorry there has been a problem`)
//     }
//     response.writeHead(200, {'Content-type':'text/html'})
//     return response.end(`<img src="${data.image_original_url}" alt="${data.title}">`)
//   });
// })

// with http.get
const http = require('http')
const apiKey = 'ADD YOUR API KEY HERE'

module.exports = ((request, response) => {
  http.get(`http://api.giphy.com/v1/gifs/random?tag=bear&api_key=${apiKey}`, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const { data } = JSON.parse(rawData);
        response.writeHead(200, {'Content-type':'text/html'})
        return response.end(`<img src="${data.image_original_url}" alt="${data.title}">`)
      } catch (e) {
        response.writeHead(500)
        return response.end(`Sorry there has been a problem`)
      }
    });
  }).on('error', (e) => {
    response.writeHead(500)
        return response.end(`Sorry there has been a problem`)
  });
})