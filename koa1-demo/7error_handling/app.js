var koa = require('koa');

var app = koa();

app.use(errorHandler());

app.use(function* () {
    if (this.path === '/error') throw new Error('ooops');
    this.body = 'OK';
});

function errorHandler() {
    return function* (next) {
        // we catch all downstream errors here
        try {
            yield next;
        } catch (err) {
            // set response status
            this.status = 500;
            // set response body
            this.body = 'internal server error';
            // can emit on app for log
            // this.app.emit('error', err, this);
        }
    };
}

app.listen(process.argv[2]);
//responds "OK" when requesting `/`
//response status is 200 when requesting `/`
//responds "internal server error" when requesting `/error`
//response status is 500 when requesting `/error`
