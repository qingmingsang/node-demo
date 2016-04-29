var connect = require('connect');
//路由器组件
var router = require('./middleware/router');
//定义路由的对象
var routes = {
  GET: {
    '/users': function(req, res){
      res.end('tobi, loki, ferret');
    },
    //每一项都是对请求的映射，包含回调函数
    '/user/:id': function(req, res, id){
      res.end('user ' + id);
    }
  },
  DELETE: {
    '/user/:id': function(req, res, id){
      res.end('deleted user ' + id);
    }
  }
};

connect()
//传给setup函数
  .use(router(routes))
  .listen(3000);
