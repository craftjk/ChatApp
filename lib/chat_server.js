var createChat = function(server) {
	var io = require("socket.io").listen(server);

	io.sockets.on('connection', function (socket) {
	  io.sockets.emit('message', { text: 'Someone logged in!' });
	  socket.on('message', function (incoming) {
	    console.log(incoming);
			io.sockets.emit('message', incoming);
	  });
	});
};

module.exports.createChat = createChat;