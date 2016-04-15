//净化文本
function divEscapedContentElement(message) {
	return $('<div></div>').text(message);
}
//净化文本
function divSystemContentElement(message) {
	return $('<div></div>').html('<i>' + message + '</i>');
}
//用户输入
function processUserInput(chatApp, socket) {
	var message = $('#send-message').val();
	var systemMessage;
	//以斜杠开头为聊天命令
	if (message.charAt(0) == '/') {
		systemMessage = chatApp.processCommand(message);
		if (systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		//非命令输入广播给其他用户
		chatApp.sendMessage($('#room').text(), message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}

	$('#send-message').val('');
}
//客户端初始化逻辑
var socket = io.connect();

$(document).ready(function() {
	var chatApp = new Chat(socket);
	//显示更名结果
	socket.on('nameResult', function(result) {
		var message;

		if (result.success) {
			message = 'You are now known as ' + result.name + '.';
		} else {
			message = result.message;
		}
		$('#messages').append(divSystemContentElement(message));
	});
	//显示房间变更结果
	socket.on('joinResult', function(result) {
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed.'));
	});
	//显示接收到的消息
	socket.on('message', function(message) {
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});
	//显示可用房间列表
	socket.on('rooms', function(rooms) {

		$('#room-list').empty();

		for (var room in rooms) {
			room = room.substring(1, room.length);
			if (room != '') {
				$('#room-list').append(divEscapedContentElement(room));
			}
		}
		//点击切换房间
		$('#room-list div').click(function() {
			chatApp.processCommand('/join ' + $(this).text());
			$('#send-message').focus();
		});
	});
	//定期请求可用房间列表
	setInterval(function() {
		socket.emit('rooms');
	}, 1000);

	$('#send-message').focus();
	//发送消息
	$('#send-form').submit(function() {
		processUserInput(chatApp, socket);
		return false;
	});
});