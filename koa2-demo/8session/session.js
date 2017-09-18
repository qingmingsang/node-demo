const Koa = require('koa');
const session = require('koa-session2');
const app = new Koa();

//app.keys = ['secret', 'keys'];

app.use(session());

app.use(async (ctx,next) => {
    console.log('1');
    console.log(ctx.session.user);
    console.log('2');
    ctx.session.user = 'gg'
    console.log('3');
    console.log(ctx.session.user);
    ctx.session.user = "tom";
    ctx.body = ctx.session;
    await next();
});


app.use(async (ctx,next) => {
    ctx.session.user = "luffi";
    ctx.body = ctx.session;
    console.log(ctx.session.user);
    await next();
});
app.use(async (ctx,next) => {
    ctx.session = {};
    console.log(ctx.session);
});

//不执行
app.use(async (ctx,next) => {
    ctx.session.go = 'go';
    console.log(ctx.session.go);
});
app.listen(3000);
//first visit: 1 views
//visit again: 2 views
//new user visit page: 1 views

