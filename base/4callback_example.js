var http = require('http');
var fs = require('fs');
//创建HTTP服务器并用回调定义响应逻辑
http.createServer(function(req, res) {
	if (req.url == '/') {
		//读取文件
		fs.readFile('./titles.json', function(err, data) {
			//错误判定
			if (err) {
				console.error(err);
				res.end('Server Error');
			} else {
				//解析数据
				var titles = JSON.parse(data.toString());
				//读取文件
				fs.readFile('./template.html', function(err, data) {
					if (err) {
						console.error(err);
						res.end('Server Error');
					} else {
						var tmpl = data.toString();
						//组装页面
						var html = tmpl.replace('%', titles.join('</li><li>'));
						res.writeHead(200, {
							'Content-Type': 'text/html'
						});
						//发送给用户
						res.end(html);
					}
				});
			}
		});
	}
}).listen(8000, "127.0.0.1");