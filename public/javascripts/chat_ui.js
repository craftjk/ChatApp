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
		chat = ChatApp.chat = ChatApp.chat || new ChatApp.Chat(socket);
		$("form.input-form").on("submit", function(event) {
			event.preventDefault();
			var newMsg = getMsg(event.target[0].value);
			chat.sendMessage(newMsg);
		});
	});
})(this);