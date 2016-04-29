var connect = require('connect');

function badMiddleware(req, res, next) {
	next(new Error('Bad middleware makes error'));
}

function errorHandler() {
	//检测服务器环境
	var env = process.env.NODE_ENV || 'development';
	return function(err, req, res, next) {
		res.statusCode = 500;
		switch (env) {
			//根据环境的不同，不同的操作
			case 'development':
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(err));
				break;
			default:
				res.end('Server error');
		}
	}
}

connect()
	.use(badMiddleware)
	.use(errorHandler)
	.listen(3000);