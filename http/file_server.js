var server = http.createServer(function(req, res) {
	//解析url获取路径名
	var url = parse(req.url);
	var path = join(root, url.pathname);
	//检查文件是否存在
	fs.stat(path, function(err, stat) {
		if (err) {
			//不存在
			if ('ENOENT' == err.code) {
				res.statusCode = 404;
				res.end('Not Found');
			} else {
				res.statusCode = 500;
				res.end('Internal Server Error');
			}
		} else {
			//设置Content-Length
			res.setHeader('Content-Length', stat.size);
			var stream = fs.createReadStream(path);
			stream.pipe(res);
			stream.on('error', function(err) {
				res.statusCode = 500;
				res.end('Internal Server Error');
			});
		}
	});
});