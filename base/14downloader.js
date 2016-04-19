var flow = require('nimble');
var exec = require('child_process').exec;
//下载
function downloadNodeVersion(version, destination, callback) {
	var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
	var filepath = destination + '/' + version + '.tgz';
	exec('curl ' + url + ' >' + filepath, callback);
}
//串行化任务
flow.series([
	function(callback) {
		flow.parallel([
			function(callback) {
				console.log('Downloading Node v0.4.6...');
				downloadNodeVersion('0.4.6', '/tmp', callback);
			},
			function(callback) {
				console.log('Downloading Node v0.4.7...');
				downloadNodeVersion('0.4.7', '/tmp', callback);
			}
		], callback);
	},
	function(callback) {
		console.log('Creating archive of downloaded files...');
		exec(
			//创建归档文件
			'tar cvf node_distros.tar /tmp/0.4.6.tgz /tmp/0.4.7.tgz',
			function(error, stdout, stderr) {
				console.log('All done!');
				callback();
			}
		);
	}
]);