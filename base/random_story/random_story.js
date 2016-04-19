var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';
//确保文件存在
function checkForRSSFile() {
	fs.exists(configFilename, function(exists) {
		if (!exists)
		//返回错误
			return next(new Error('Missing RSS file: ' + configFilename));

		next(null, configFilename);
	});
}
//读取解析文件
function readRSSFile(configFilename) {
	fs.readFile(configFilename, function(err, feedList) {
		if (err) return next(err);
		//将URL列表转换成字符串，然后分隔成数组
		feedList = feedList
			.toString()
			.replace(/^\s+|\s+$/g, '')
			.split("\n");
		var random = Math.floor(Math.random() * feedList.length);
		next(null, feedList[random]);
	});
}
//向预定源发送HTTP请求以获得数据
function downloadRSSFeed(feedUrl) {
	request({
		uri: feedUrl
	}, function(err, res, body) {
		if (err) return next(err);
		if (res.statusCode != 200)
			return next(new Error('Abnormal response status code'))

		next(null, body);
	});
}
//将预定的数据源解析到一个条目数组中
function parseRSSFeed(rss) {
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);

	if (!handler.dom.items.length)
		return next(new Error('No RSS items found'));
	//显示第一个预定源条目的标题和URL
	var item = handler.dom.items.shift();
	console.log(item.title);
	console.log(item.link);
}
//执行任务数组
var tasks = [checkForRSSFile,
	readRSSFile,
	downloadRSSFeed,
	parseRSSFeed
];

function next(err, result) {
	if (err) throw err;

	var currentTask = tasks.shift();
	//执行
	if (currentTask) {
		currentTask(result);
	}
}

next();