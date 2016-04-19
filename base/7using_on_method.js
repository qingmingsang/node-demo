var net = require('net');
//need telnet
var server = net.createServer(function(socket) {
	//当读取到新数据时处理data事件
  socket.on('data', function(data) {
  	//数据被写入客户端
    socket.write(data);
  });
});

server.listen(8888);
