/**
 * A very simple flash example.
 * Only uses JSON for simplicity.
 */

var koa = require('koa');
var rawBody = require('raw-body');
var session = require('koa-session');

var app = koa();

// required for signed cookie sessions
app.keys = ['key1', 'key2'];
app.use(session(app));

app.use(function *(next){
    console.log(1);
    if (this.method !== 'GET' || this.path !== '/messages') return yield next;
    console.log(4);
    // get any messages saved in the session
    var messages = this.session.messages || [];
    this.body = messages;

    // delete the messages as they've been deliverd
    delete this.session.messages;
})

app.use(function *(next){
    console.log(2);
    if (this.method !== 'POST' || this.path !== '/messages') return yield next;
    console.log(3);
    // the request string is the flash message
    var message = yield rawBody(this.req, {
        encoding: 'utf8'
    });
    console.log(message);
    // push the message to the session
    this.session.messages = this.session.messages || [];
    this.session.messages.push(message);
    console.log(this.session.messages);
    // tell the client everything went okay
    this.status = 204;
})

app.listen(3000);
