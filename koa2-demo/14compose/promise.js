import Koa from 'koa';
const app = new Koa();

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

//const all = Promise.all([a, b, c]);
app.use(Promise.all([a, b, c]));
app.listen(3000);
//>> one
//>> two
//>> three
//<< three
//<< two
//<< one
