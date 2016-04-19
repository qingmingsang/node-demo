//引入currency模块，文件路径为模块文件相对该文件的位置
var currency = require('./currency');
//模块名.方法名
console.log('50 Canadian dollars equals this amount of US dollars:');
console.log(currency.canadianToUS(50));

console.log('30 US dollars equals this amount of Canadian dollars:');
console.log(currency.USToCanadian(30));

var this_currency = require('./this_currency');
var thisCurrency = new this_currency(0.1);
console.log(thisCurrency.canadianToUS(50));
console.log(thisCurrency.USToCanadian(30));