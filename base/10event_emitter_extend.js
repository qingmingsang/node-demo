
function Watcher(watchDir, processedDir) {
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}

var events = require('events'),
	util = require('util');

util.inherits(Watcher, events.EventEmitter);

var fs = require('fs'),
	watchDir = './watch',
	processedDir = './done';

//扩展EventEmitter，添加处理文件的方法
Watcher.prototype.watch = function() {
	//保存引用
	var watcher = this;
	fs.readdir(this.watchDir, function(err, files) {
		if (err) throw err;
		for (index in files) {
			watcher.emit('process', files[index]);
		}
	})
}
//开始监控
Watcher.prototype.start = function() {
	var watcher = this;
	fs.watchFile(watchDir, function() {
		watcher.watch();
	});
}

var watcher = new Watcher(watchDir, processedDir);
//继承
watcher.on('process', function process(file) {
	var watchFile = this.watchDir + '/' + file;
	var processedFile = this.processedDir + '/' + file.toLowerCase();

	fs.rename(watchFile, processedFile, function(err) {
		if (err) throw err;
	});
});
//大概效果就是watch文件夹文件被被转移到done了
watcher.start();