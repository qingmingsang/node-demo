const Koa = require('koa');
const app = new Koa();


app.use(async (ctx, next)=> {
  console.log('>> one');
  await next();
  console.log('<< one');
});

app.use(async (ctx, next)=> {
  console.log('>> two');
  ctx.body = 'two';
  console.log('<< two');
});

app.use(async (ctx, next)=> {
  console.log('>> three');
  await next();
  console.log('<< three');
});

app.listen(3000);
//>> one
//>> two
//<< two
//<< one
