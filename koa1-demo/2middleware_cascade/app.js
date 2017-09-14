var koa = require('koa');
var app = koa();

//请求先经过 x-response-time 和 logging 中间件，
// 并记录中间件执行起始时间。
//然后将控制权交给 reponse 中间件。
// 当中间件运行到 yield next 时，
// 函数挂起并将控制前交给下一个中间件。
// 当没有中间件执行 yield next 时，
// 程序栈会逆序唤起被挂起的中间件来执行接下来的代码。

// x-response-time

app.use(function *(next){
  var start = new Date;
  console.log("x-response-time->start->"+start);
  yield next;
  var ms = new Date - start;
  console.log("x-response-time->"+ms);
  this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
  var start = new Date;
  console.log("logger->start->"+start);
  yield next;
  var ms = new Date - start;
  console.log('logger ->%s %s -> %s', this.method, this.url, ms);
});

// response

app.use(function *(){
  console.log("response->start->"+new Date);
  this.body = 'Hello World';

});
//类似得到这样的log流程结果

//x-response-time->start->Thu Jun 02 2016 18:08:33 GMT+0800 (中国标准时间)
//logger->start->Thu Jun 02 2016 18:08:33 GMT+0800 (中国标准时间)
//response->start->Thu Jun 02 2016 18:08:33 GMT+0800 (中国标准时间)
//logger ->GET / -> 9
//x-response-time->18

app.listen(3000);