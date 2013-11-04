var http = require ('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var socketio = require('socket.io');

http.createServer(function (request, response) {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.end('Hello World\n');
}).listen(8080);

console.log('Server running at blahblahblah:8080');