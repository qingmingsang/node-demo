const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
import Test from './Test';

app.use(bodyParser());

app.use(ctx => {
    // the parsed body will store in this.request.body
    let test = new Test();
    //test.asyncFunc();
    test.normal();
    ctx.body = ctx.request.body;
});



app.listen(3000);