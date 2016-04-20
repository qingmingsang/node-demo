//一个最基本的ReadStream静态文件服务器
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
//该文件所在的目录
var root = __dirname;

var server = http.createServer(function(req, res) {
	var url = parse(req.url);
	//拼接获得绝对路径
	var path = join(root, url.pathname);
	//创建fs.ReadStream
	var stream = fs.createReadStream(path);
	//文件数据写入响应
	stream.on('data', function(chunk) {
		res.write(chunk);
	});
	stream.on('end', function() {
		//结束
		res.end();
	});
});

server.listen(3000);