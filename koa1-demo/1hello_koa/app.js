var koa = require('koa');

var app = koa();

app.use(function* () {
    this.body = 'hello koa';
});

//打印 process.argv
//process.argv.forEach(function(val, index, array) {
//  console.log(index + ': ' + val);
//});
//
//console.log('1->'+process);
//console.log('2->'+process.argv);
//console.log('3->'+process.argv[2]);
//app.listen(process.argv[2]);//node app 3000
app.listen(3000);