var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};
//连接处理逻辑
exports.listen = function(server) {
	//启动Socket.IO服务器
	io = socketio.listen(server);
	io.set('log level', 1);
	//定义每个用户连接的逻辑
	io.sockets.on('connection', function(socket) {
		//分配访客名
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		//用户连接上后放入Lobby聊天室
		joinRoom(socket, 'Lobby');
		//处理消息、更名，聊天室创建、变更
		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);
		//向请求用户提供已被占用聊天室列表
		socket.on('rooms', function() {
			socket.emit('rooms', io.sockets.manager.rooms);
		});
		//定义用户断开连接后的清除逻辑
		handleClientDisconnection(socket, nickNames, namesUsed);
	});
};
//分配访客名
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	//生成新昵称
	var name = 'Guest' + guestNumber;
	//用户昵称与客户端ID关联
	nickNames[socket.id] = name;
	//发射用户昵称
	socket.emit('nameResult', {
		success: true,
		name: name
	});
	//存放已用昵称
	namesUsed.push(name);
	//增加新昵称的计数器
	return guestNumber + 1;
}
//用户连接上后放入Lobby聊天室。进入聊天室
function joinRoom(socket, room) {
	//进入房间
	socket.join(room);
	//记录当前房间
	currentRoom[socket.id] = room;
	//发射新房间
	socket.emit('joinResult', {
		room: room
	});
	//广播让其他用户知道新用户进入
	socket.broadcast.to(room).emit('message', {
		text: nickNames[socket.id] + ' has joined ' + room + '.'
	});
//确定有哪些用户在这个房间
	var usersInRoom = io.sockets.clients(room);
	//如果不止一个用户，汇总用户
	if (usersInRoom.length > 1) {
		var usersInRoomSummary = 'Users currently in ' + room + ': ';
		for (var index in usersInRoom) {
			var userSocketId = usersInRoom[index].id;
			if (userSocketId != socket.id) {
				if (index > 0) {
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += '.';
		//让该用户知道其他用户是谁
		socket.emit('message', {
			text: usersInRoomSummary
		});
	}
}
//更改昵称
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
	//监听nameAttempt
	socket.on('nameAttempt', function(name) {
		//昵称不能以guest开头
		if (name.indexOf('Guest') == 0) {
			socket.emit('nameResult', {
				success: false,
				message: 'Names cannot begin with "Guest".'
			});
		} else {
			//开始注册
			if (namesUsed.indexOf(name) == -1) {
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				//删除之前的昵称
				delete namesUsed[previousNameIndex];
				socket.emit('nameResult', {
					success: true,
					name: name
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('message', {
					text: previousName + ' is now known as ' + name + '.'
				});
			} else {
				//如果已被占用
				socket.emit('nameResult', {
					success: false,
					message: 'That name is already in use.'
				});
			}
		}
	});
}
//发送聊天消息
function handleMessageBroadcasting(socket) {
	socket.on('message', function(message) {
		socket.broadcast.to(message.room).emit('message', {
			text: nickNames[socket.id] + ': ' + message.text
		});
	});
}
//创建房间
function handleRoomJoining(socket) {
	socket.on('join', function(room) {
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}
//断开连接
function handleClientDisconnection(socket) {
	socket.on('disconnect', function() {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}