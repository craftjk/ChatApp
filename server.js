var http = require ('http');
var path = require('path');
var mime = require('mime');
// var socketio = require("socket.io");

var router = require('./router.js');
var chatServer = require('./lib/chat_server.js');

var server = http.createServer(function (request, response) {
	router.route(request, response);
}).listen(8080);

chatServer.createChat(server);

console.log('Server running at blahblahblah:8080');