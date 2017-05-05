const server = require('http').Server();
const io = require('socket.io')(server);

server.listen(3000);
console.log('go 3000');

io.on('connection', socket => {
    socket.on('random', value => {
        console.log(value);
        if (value > 0.55) {
            if (typeof socket.warning === 'undefined') socket.warning = 0;
            setTimeout(() => {
                socket.emit('warn', ++socket.warning);
            }, 1000);//延迟一秒后发送警告
            if (socket.warning > 3) {
                socket.disconnect();
                console.log('server disconnect');
            }
        }
    })
});