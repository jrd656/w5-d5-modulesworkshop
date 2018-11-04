const url = require('url')

const home = require('./home')
const one = require('./one')
const find = require('./find')
const random = require('./random')
const notFound = require('./not_found')

const router = ((request, response) => {
  // basic route logger
  console.log(`${request.method} ${request.url}`)
  
  // grab pathname 
  const { pathname } = url.parse(request.url)
  
  // router
  switch(pathname){
    case `/`:
      return home(request, response);

    case `/one`:
      return one(request, response);

    case `/find`:
      return find(request,response);

    case `/random`:
      return random(request, response);

    default:
      return notFound(request, response);
    }
})

module.exports = router;