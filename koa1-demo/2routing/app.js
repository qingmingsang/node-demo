var koa = require('koa');

var app = koa();

//配置路由
app.use(function* (next) {
    if (this.path !== '/') {
        return yield next;
    }

    this.body = 'hello koa';
});

app.use(function* (next) {
    if (this.path !== '/404') {
        return yield next;
    }

    this.body = 'page not found';
});

app.use(function* (next) {
    if (this.path !== '/500') {
        return yield next;
    }

    this.body = 'internal server error';
});

app.listen(3000);
//`/` respond body: hello koa
//`/404` respond body: page not found
//`/500` respond body: internal server error
