var connect = require('connect');

function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
}

function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
}

function authenticateWithDatabase(user, pass, callback) {
	var err;
	if (user != 'tobi' || pass != 'ferret') {
		err = new Error('Unauthorized');
	}
	callback(err);
}
//HTTP basic认证
function restrict(req, res, next) {
	var authorization = req.headers.authorization;
	if (!authorization) return next(new Error('Unauthorized'));

	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
	//根据数据库记录检查认证信息
	authenticateWithDatabase(user, pass, function(err) {
		//出错通告
		if (err) return next(err);
		//成功则next
		next();
	});
}
//路由admin请求
function admin(req, res, next) {
	switch (req.url) {
		//去掉了req.url的前缀部分
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(['tobi', 'loki', 'jane']));
			break;
	}
}

connect()
	.use(logger)
	.use('/admin', restrict)
	.use('/admin', admin)
	.use(hello)
	.listen(3000);