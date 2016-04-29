var connect = require('connect');

function hello(req, res, next) {
	if (req.url.match(/^\/hello/)) {
		res.end('Hello World\n');
	} else {
		next();
	}
}

var db = {
	users: [{
		name: 'tobi'
	}, {
		name: 'loki'
	}, {
		name: 'jane'
	}]
};
//搜索用户组件
function users(req, res, next) {
	var match = req.url.match(/^\/user\/(.+)/);
	if (match) {
		var user = db.users[match[1]];
		if (user) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(user));
		} else {
			var err = new Error('User not found');
			err.notFound = true;
			next(err);
		}
	} else {
		next();
	}
}

function pets(req, res, next) {
	if (req.url.match(/^\/pet\/(.+)/)) {
		foo();
	} else {
		next();
	}
}
//不暴露非必要数据
function errorHandler(err, req, res, next) {
	console.error(err.stack);
	res.setHeader('Content-Type', 'application/json');
	if (err.notFound) {
		res.statusCode = 404;
		res.end(JSON.stringify({
			error: err.message //User not found
		}));
	} else {
		res.statusCode = 500;
		res.end(JSON.stringify({
			error: 'Internal Server Error'
		}));
	}
}

connect()
	.use(users)
	.use(pets)
	.use(errorHandler)
	.use(hello)
	.listen(3000);