'use strict';

var _Test = require('./Test');

var _Test2 = _interopRequireDefault(_Test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var app = new Koa();


app.use(bodyParser());

app.use(function (ctx) {
    // the parsed body will store in this.request.body
    var test = new _Test2.default();
    //test.asyncFunc();
    test.normal();
    ctx.body = ctx.request.body;
});

app.listen(3000);
//# sourceMappingURL=app.js.map