var connect = require('connect');

var app = connect();

var User = {
		authenticate: function(credentials, callback) {
			if (credentials.user == 'tobi' && credentials.pass == 'ferret') {
				callback(null, credentials);
			} else {
				callback(new Error('Incorrect credentials.'));
			}
		}
	}
	//HTTP基本认证
app.use(connect.basicAuth(function(user, pass, callback) {
	//数据库验证
	User.authenticate({
		user: user,
		pass: pass
	}, gotUser);

	function gotUser(err, user) {
		if (err) return callback(err);
		//传入basicAuth()回调中
		callback(null, user);
	}
}));

app.listen(3000);