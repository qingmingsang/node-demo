const socket = require('socket.io-client')('http://localhost:3000');

let interval = setInterval(() => {
    socket.emit('random', Math.random());
}, 500);
socket.on('warn', count => {
    console.log('warning count: ' + count);
});
socket.on('disconnect', () => {
    clearInterval(interval);//不清除虽然emit的不会再被接收，但是循环不会结束
    console.log('client disconnect');
});