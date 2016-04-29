function setup(format) {
	//匹配请求属性
  var regexp = /:(\w+)/g;
	//使用的真实logger组件
  return function logger(req, res, next) {
  	//格式化
    var str = format.replace(regexp, function(match, property){
      return req[property];
    });

    console.log(str);

    next();
  }
}

module.exports = setup;
