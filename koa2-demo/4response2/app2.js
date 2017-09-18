const Koa = require('koa');
const app = new Koa();


app.use(async (ctx, next)=> {
  console.log('A middleware1 开始')
  await next();
  console.log('B middleware1 结束')
});

app.use(async (ctx, next)=> {
  console.log('A middleware2 开始')
  await next();
  console.log('B middleware2 结束')
});

app.use(async (ctx, next)=> {
  console.log('A middleware3 开始')
  await next();
  console.log('B middleware3 结束')
});

app.use(async (ctx, next)=> {
  console.log('======= G =======')
});

app.listen(3000)
