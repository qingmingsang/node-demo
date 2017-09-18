import Koa from 'koa';
import Router from 'koa-router';
import request from 'supertest';
const app = new Koa();
const router = new Router();


app.use(router.routes())
router.get('/', (ctx, next)=> {
        ctx.body = 'Hello World2';
    })
    .get('/hi', (ctx, next)=> {
        ctx.body = 'Hi World';
    })

const agent = request.agent(app);

describe('GET /', function () {
    it('Hello', function (done) {
        agent
            .get('/')
            .expect('Hello World2', done);
    });
    it('hi', function (done) {
        agent
            .get('/hi')
            .expect('Hi World', done);
    });
});