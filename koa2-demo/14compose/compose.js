import Koa from 'koa';
const app = new Koa();
import compose from 'koa-compose';

async function a(ctx, next) {
    console.log('>> one');
    await next();
    console.log('<< one');
}

async function b(ctx, next) {
    console.log('>> two');
    ctx.body = 'two';
    await next();
    console.log('<< two');
}

async function c(ctx, next) {
    console.log('>> three');
    await next();
    console.log('<< three');
}

const all = compose([c, a, b]);//影响执行的顺序
app.use(all);
app.listen(3000);
//>> one
//>> two
//>> three
//<< three
//<< two
//<< one
