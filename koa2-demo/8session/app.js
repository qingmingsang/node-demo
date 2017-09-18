const Koa = require('koa');
const session = require('koa-session2');
const app = new Koa();

//app.keys = ['secret', 'keys'];

app.use(session());

//app.use(async (ctx, next)=> {
//
//    if (!ctx.session.view) {
//        ctx.session.view = 0;
//    }
//    console.log(ctx.session.view);
//
//    await next();
//    let n = ++ctx.session.view;
//    ctx.body = n + ' views';
//
//});
app.use((ctx)=> {
    console.log('1!');
    if (!ctx.session.view) {
        ctx.session.view = 0;
    }
    console.log('2!');
    console.log(ctx.session.view);
    console.log('3!');
    let n = ++ctx.session.view;
    console.log('4!');
    ctx.body = n + ' views';
    console.log('5!');

});
//app.use(ctx=> {
//    console.log(ctx.session.view);
//});
app.listen(3000);
//first visit: 1 views
//visit again: 2 views
//new user visit page: 1 views

