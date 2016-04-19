var events = require('events'),
	net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
//join事件监听器，保存用户
channel.on('join', function(id, client) {
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message) {
			if (id != senderId) {
				//忽略
				this.clients[id].write(message);
			}
		}
		//broadcast监听器
	this.on('broadcast', this.subscriptions[id]);
});
//leave监听器
channel.on('leave', function(id) {
	channel.removeListener('broadcast', this.subscriptions[id]);
	//移除指定客户端broadcast监听器
	channel.emit('broadcast', id, id + " has left the chat.\n");
});
//去掉给定类型的全部监听器
channel.on('shutdown', function() {
	channel.emit('broadcast', '', "Chat has shut down.\n");
	channel.removeAllListeners('broadcast');
});

var server = net.createServer(function(client) {
	var id = client.remoteAddress + ':' + client.remotePort;
	client.on('connect', function() {
		//用户连接进来发出一个join事件，指明用户id，client对象
		channel.emit('join', id, client);
	});
	client.on('data', function(data) {
		data = data.toString();
		if (data == "shutdown\r\n") {
			//停止服务
			channel.emit('shutdown');
		}
		//当有用户发送数据时，发出一个broadcast事件，指明用户id，client对象
		channel.emit('broadcast', id, data);
	});
	client.on('close', function() {
		//断开链接时发出leave事件
		channel.emit('leave', id);
	});
});
server.listen(8888);