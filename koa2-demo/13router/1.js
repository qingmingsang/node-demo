//var Koa = require('koa');
//var Router = require('koa-router');
//var request = require('supertest');
//var app = new Koa();
//var router = new Router();

import Koa from 'koa';
import Router from 'koa-router';
const app = new Koa();
const router = new Router();

app.use(async (ctx, next)=> {
    console.log('>> two');
    ctx.body = 'ok';
    //console.log('ok');
    await next();//important!
    console.log('<< two');
});

app.use(router.routes())
//router.get('/ga', (ctx, next)=> {
//        ctx.body = 'Hello World2';
//    })
//    .get('/hi', (ctx, next)=> {
//        ctx.body = 'Hi World';
//    })
//app.use(async (ctx, next)=> {
//    console.log('>> one');
//    await router.routes();
//    await next();
//    console.log('<< one');
//})
router.get('/ga', (ctx)=> {
        ctx.body = 'Hello World2';
    })
    .get('/hi', (ctx)=> {
        ctx.body = 'Hi World';
    })
//app.use(async (ctx,next) => {
//    console.log(1)
//    ctx.body = 'ok';
//    console.log(2)
//    await next();
//});


app.listen(3000);
