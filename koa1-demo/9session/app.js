var koa = require('koa');
var session = require('koa-session');

var app = koa();
app.keys = ['secret', 'keys'];

app.use(session(app));

app.use(function *(){
    var n = ~~this.session.view + 1;
    this.session.view = n;
    this.body = n + ' views';
});

app.listen(3000);
//first visit: 1 views
//visit again: 2 views
//new user visit page: 1 views

