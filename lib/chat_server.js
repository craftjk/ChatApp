var createChat = function(server) {
	var io = require("socket.io").listen(server);
	var guestNumber = 1;
	var nicknames = {};
	var namesUsed = {};

	io.sockets.on('connection', function (socket) {
		var changeNickname = function (newName) {
			oldName = nicknames[socket.id];
			if (nicknames[newName] ||
				namesUsed[newName] ||
				newName.slice(0, 5) == "Guest") {
					socket.emit('nicknameChangeResult', {
						success: false,
						message: 'Name must be unique, and cannot begin with "Guest".'
					});
			} else {
				nicknames[socket.id] = newName;
				namesUsed[newName] = true;
				delete namesUsed[oldName];
				io.sockets.emit('userList', Object.keys(namesUsed));
				io.sockets.emit('nicknameChangeResult', {
					success: true,
					message: oldName + " is now called " + newName
				});
			}
		};

		var commands = {
			"nick": changeNickname
		};
		var newUserName = "Guest_" + guestNumber;
		nicknames[socket.id] = newUserName;
		namesUsed[newUserName] = true;
		io.sockets.emit('message', { text: newUserName + " joined the chat!" });
		io.sockets.emit('userList', Object.keys(namesUsed));
		guestNumber++;

		socket.on('message', function (incoming) {
			if (incoming["text"].slice(0,1) === "/") {
				parseCommand(incoming["text"].slice(1));
			} else {
				var userName = nicknames[socket.id];
				console.log(incoming);
				var outgoing = { text: userName + ": " + incoming["text"]};
				io.sockets.emit('message', outgoing);
			}
		});

		socket.on('disconnect', function () {
			oldName = nicknames[socket.id];
			delete nicknames[socket.id];
			delete namesUsed[oldName];
			io.sockets.emit('message', { text: oldName + " has left the chatroom." });
			io.sockets.emit('userList', Object.keys(namesUsed));
		});

		var parseCommand = function(commandStr) {
			var commandArr = commandStr.split(" ");
			var command = commandArr.shift();
			var args = commandArr.join(" ");
			if (commands[command]) {
				commands[command](args);
			} else {
				socket.emit('commandResult', {
					success: false,
					message: command + " is not a valid command"
				});
			}
		};

	});
};

module.exports.createChat = createChat;