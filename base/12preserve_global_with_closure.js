//匿名函数保护变量
function asyncFunction(callback) {
	setTimeout(function() {
		callback()
	}, 200);
}

var color = 'blue';

(function(color) {
	asyncFunction(function() {
		console.log('The color is ' + color);
	})
})(color);

color = 'green';