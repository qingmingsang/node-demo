const Koa = require('koa');
const app = new Koa();
const fsp = require('fs-promise');

app.use(async function (ctx, next) {
  const paths = await fsp.readdir('docs');
  const files = await Promise.all(paths.map(path => fsp.readFile(`docs/${path}`, 'utf8')));

  ctx.type = 'markdown';
  ctx.body = files.join('');
});

app.listen(3000);
