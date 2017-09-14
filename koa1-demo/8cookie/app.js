var koa = require('koa');

var app = koa();

// to use signed cookie, we need to set app.keys
app.keys = ['secret', 'keys'];//设置签名Cookie密钥,该密钥会被传递给 KeyGrip。

app.use(function *(){
    var n = ~~this.cookies.get('view', { signed: true }) + 1;
    this.cookies.set('view', n, { signed: true });//设置 signed 为 true 时，使用密钥进行加密
    this.body = n + ' views';
});

app.listen(3000);
//first visit: 1 views
//visit again: 2 views  //fresh
//signed cookie can not be tampered
