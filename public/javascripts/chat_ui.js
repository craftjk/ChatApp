(function (root){
	var ChatApp = root.ChatApp = root.ChatApp || {};

	var getMsg = ChatApp.getMsg = function(message){
		return message;
	}

	var updateMsgs = ChatApp.updateMsgs = function (msg) {
		var msgEl = $("<p></p>").text(msg);
		$("div.messages").append(msgEl);
	}

	$(document).ready(function () {
		var socket = io.connect('http://localhost');
		socket.on('message', function (sOb) {
			var text = sOb["text"];
			console.log(text);
			updateMsgs(text);
		});
		socket.on('nicknameChangeResult', function (result) {
			var text = result["message"];
			if (result["success"]) {
				updateMsgs(text);
			} else {
				alert(text);
			}
		});
		chat = ChatApp.chat = ChatApp.chat || new ChatApp.Chat(socket);
		$("form.input-form").on("submit", function(event) {
			event.preventDefault();
			var newMsg = getMsg(event.target[0].value);
			chat.sendMessage(newMsg);
		});

		socket.on('userList', function (userArray) {
			console.log(userArray);
			users = userArray.join(", ");
			var usersEl = $("<h4>Users: </h4>");
			usersEl.append(users);
			$("div.user-list").html(usersEl);
		});
	});
})(this);