var fs = require('fs');
var path = require('path');
//去掉文件名只留下参数
var args = process.argv.splice(2);
//console.log(args);
//取出第一个参数
var command = args.shift();
//console.log(command);
//合并剩余参数
var taskDescription = args.join(' ');
//console.log(taskDescription);
//根据当前工作目录解析数据库的相对路径
var file = path.join(process.cwd(), '/.tasks');
//console.log(file);
switch(command) {
  case 'list':
    listTasks(file);
    break;

  case 'add':
    addTask(file, taskDescription);
    break;
//显示帮助
  default:
    console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]');
}
//捕获已有的任务,加载用JSON编码的数据
function loadOrInitializeTaskArray(file, cb) {
	//检查.task文件是否已存在
  fs.exists(file, function(exists) {
    var tasks = [];
    if (exists) {
    	//从task文件中读取代办事项数据
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;
        var data = data.toString();
        //把用JSON编码的待办事项数据解析到任务数组中
        var tasks = JSON.parse(data || '[]');
        cb(tasks);
      });
    } else {
    	//task任务不存在创建空数组
      cb([]); 
    }
  });
}
//列出所有已保存的任务
function listTasks(file) {
  loadOrInitializeTaskArray(file, function(tasks) {
    for(var i in tasks) {
      console.log(tasks[i]);
    }
  });
}
//存放任务
function storeTasks(file, tasks) {
	//writeFile会重写整个文件
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', function(err) {
    if (err) throw err;
    console.log('Saved.');
  });
}
//添加新任务
function addTask(file, taskDescription) {
  loadOrInitializeTaskArray(file, function(tasks) {
    tasks.push(taskDescription);
    storeTasks(file, tasks);
  });
}
