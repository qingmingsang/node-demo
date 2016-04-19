var net = require('net');

var server = net.createServer(function(socket) {
	//只处理一次
  socket.once ('data', function(data) {
    socket.write(data);
  });
});

server.listen(8888);
