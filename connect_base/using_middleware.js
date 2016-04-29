var connect = require('connect');
//输出HTTP请求的方法和URL，并调用NEXT()
function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
}
//hello world相应HTTP请求
function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
}
//输出hello world   
connect()
	.use(logger)
	.use(hello)
	.listen(3000);