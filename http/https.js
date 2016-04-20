var https = require('https');
var fs = require('fs');
var options = {
	//作为配置项的SSL秘钥和证书
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./key-cert.pem')
};
https.createServer(options, function(req, res) {
	res.writeHead(200);
	res.end("hello world\n");
}).listen(3000);