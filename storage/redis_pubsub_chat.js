var net = require('net');
var redis = require('redis');
//为每个连接到聊天服务器的用户定义设置逻辑
var server = net.createServer(function(socket) {
  var subscriber;
  var publisher;

  socket.on('connect', function() {
  	//创建预定客户端
    subscriber = redis.createClient();
    //预定信道
    subscriber.subscribe('main_chat_room');
		//收到信息后发给用户
    subscriber.on('message', function(channel, message) {
      socket.write('Channel ' + channel + ': ' + message);
    });
		//创建发布客户端
    publisher = redis.createClient();
  });

  socket.on('data', function(data) {
  	//输入消息后发布它
    publisher.publish('main_chat_room', data);
  });
//断开连接
  socket.on('end', function() {
    subscriber.unsubscribe('main_chat_room');
    subscriber.end();
    publisher.end();
  });
});

server.listen(3000);
