var Chat = function(socket) {
	this.socket = socket;
};
//发送消息
Chat.prototype.sendMessage = function(room, text) {
	var message = {
		room: room,
		text: text
	};
	this.socket.emit('message', message);
};
//变更房间
Chat.prototype.changeRoom = function(room) {
	this.socket.emit('join', {
		newRoom: room
	});
};

Chat.prototype.processCommand = function(command) {
	var words = command.split(' ');
	//从第一个单词开始解析命令
	var command = words[0]
		.substring(1, words[0].length)
		.toLowerCase();
	var message = false;

	switch (command) {
		case 'join':
			words.shift();
			var room = words.join(' ');
			//处理房间变换、创建
			this.changeRoom(room);
			break;
		case 'nick':
			words.shift();
			var name = words.join(' ');
			//处理更名
			this.socket.emit('nameAttempt', name);
			break;
		default:
			//出错返回错误信息
			message = 'Unrecognized command.';
			break;
	};

	return message;
};