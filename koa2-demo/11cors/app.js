const Koa = require('koa');
const convert = require('koa-convert');
const route = require('koa-route');
const cors = require('koa-cors');
const app = new Koa();

app.use(convert(cors()));

app.use(route.get('/', ctx=> {
    ctx.body = {msg: 'Hello World!'};
}));

app.listen(3000);