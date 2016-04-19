var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';

function checkIfComplete() {
	completedTasks++;
	if (completedTasks == tasks.length) {
		//完成后显示用到的单词用了几次
		for (var index in wordCounts) {
			console.log(index + ': ' + wordCounts[index]);
		}
	}
}

function countWordsInText(text) {
	var words = text
		.toString()
		.toLowerCase()
		.split(/\W+/)
		.sort();
	for (var index in words) {
		//单词计数
		var word = words[index];
		if (word) {
			wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
		}
	}
}
//得出text目录文件列表
fs.readdir(filesDir, function(err, files) {
	if (err) throw err;
	for (var index in files) {
		//如何处理异步任务
		var task = (function(file) {
			return function() {
				fs.readFile(file, function(err, text) {
					if (err) throw err;
					countWordsInText(text);
					checkIfComplete();
				});
			}
		})(filesDir + '/' + files[index]);
		//任务调用数组
		tasks.push(task);
	}
	//开始执行
	for (var task in tasks) {
		tasks[task]();
	}
});