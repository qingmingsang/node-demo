var connect = require('connect');

function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
}

function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
}
//end了的话就不会再调用next了，通过控制end可以控制流程
var app = connect()
	.use(hello)
	.use(logger)
	.listen(3000);