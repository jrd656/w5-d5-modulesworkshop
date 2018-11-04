const http = require('http');
const router = require('./routes')

const server = http.createServer(router);

module.exports = server