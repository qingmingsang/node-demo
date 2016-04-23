var mongoose = require('mongoose');
//打开tasks
var db = mongoose.connect('mongodb://localhost/tasks');
//注册schema
var Schema = mongoose.Schema;
var Tasks = new Schema({
	project: String,
	description: String
});
mongoose.model('Task', Tasks);
//添加任务
var Task = mongoose.model('Task');
var task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function(err) {
	if (err) throw err;
	console.log('Task saved.');
});
//搜索
var Task = mongoose.model('Task');
Task.find({
	'project': 'Bikeshed'
}, function(err, tasks) {
	for (var i = 0; i < tasks.length; i++) {
		console.log('ID:' + tasks[i]._id);
		console.log(tasks[i].description);
	}
});
//更新
var Task = mongoose.model('Task');

Task.update({
		//内部ID更新
		_id: '4e65b793d0cf5ca508000001'
	}, {
		description: 'Paint the bikeshed green.'
	}, {
		//只更新一个文档
		multi: false
	},
	function(err, rows_updated) {
		if (err) throw err;
		console.log('Updated.');
	}
);
//删除
var Task = mongoose.model('Task');
Task.findById('4e65b3dce1592f7d08000001', function(err, task) {
	task.remove();
});
//mongoose.disconnect();关闭