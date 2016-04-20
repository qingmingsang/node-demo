var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res) {
	//请求所用HTTP方法
	switch (req.method) {
		case 'POST':
			//设置缓存
			var item = '';
			//将dota编码为utf8
			req.setEncoding('utf8');
			req.on('data', function(chunk) {
				//拼接到缓存上
				item += chunk;
			});
			req.on('end', function() {
				//新事项压入数组中
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			items.forEach(function(item, i) {
				//第一次调用write时会写入带有默认域的响应头给传给它的数据
				res.write(i + ')' + item + '\n');
			});
			res.end();
			break;
		case 'DELETE':
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);
			if (isNaN(i)) {
				res.statusCode = 400;
				res.end('Invalid item id');
			} else if (!item[i]) {
				//确保请求的索引存在
				res.statusCode = 404;
				res.end('Item not Found');
			} else {
				//删除
				items.splice(i, 1);
				res.end('OK\n');
			}
			break;

	}
});