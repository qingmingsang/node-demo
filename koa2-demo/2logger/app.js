const Koa = require('koa');
const app = new Koa();

function logger(format) {
  format = format || ':method ":url"';

  return async function (ctx, next) {
    const str = format
        .replace(':method', ctx.method)
        .replace(':url', ctx.url);

    console.log(str);

    await next();
  };
}

app.use(logger());
app.use(logger(':method :url'));

app.listen(3000);