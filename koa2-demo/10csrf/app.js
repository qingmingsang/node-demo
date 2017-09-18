const Koa = require('koa');
const convert = require('koa-convert');
const csrf = require('koa-csrf')
const session = require('koa-session2')
const app = new Koa();


app.keys = ['session secret'];
app.use(session(app));
app.use(convert(csrf()));

app.use(ctx=> {
    if (ctx.method === 'GET') {
        ctx.body = ctx.csrf
    } else if (ctx.method === 'POST') {
        ctx.status = 204
    }
})
app.listen(3000);