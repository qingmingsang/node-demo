var parse = require('url').parse;

module.exports = function route(obj) {
  return function(req, res, next){
  	//检查确保req.medthod定义了
    if (!obj[req.method]) {
    	//未定义直接跳到下一步
      next();
      return;
    }
    //查找req.method对应路径
    var routes = obj[req.method];
    //解析url
    var url = parse(req.url);
    //路径存放到数组中
    var paths = Object.keys(routes);

    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      var fn = routes[path];
      path = path
        .replace(/\//g, '\\/')
        .replace(/:(\w+)/g, '([^\\/]+)');
        //构造正则
      var re = new RegExp('^' + path + '$');
      var captures = url.pathname.match(re);
      if (captures) {
      	//传递被捕获的分组
        var args = [req, res].concat(captures.slice(1));
        fn.apply(null, args);
        return;
      }
    }
    next();
  }
};
