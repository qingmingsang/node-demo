var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

client.on('error', function (err) {
  console.log('Error ' + err);
});
//print输出操作结果
client.set('color', 'red', redis.print);
client.get('color', function(err, value) {
  if (err) throw err;
  console.log('Got: ' + value);
});
//哈希表
client.hmset('camping', {
  'shelter': '2-person tent',
  'cooking': 'campstove'
}, redis.print);
//获取cooking的值
client.hget('camping', 'cooking', function(err, value) {
  if (err) throw err;
  console.log('Will be cooking with: ' + value);
});
//获取哈希表的键
client.hkeys('camping', function(err, keys) {
  if (err) throw err;
  keys.forEach(function(key, i) {
    console.log(' ' + key);
  });
});
//lpush向链表添加值
client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
//lrange获取参数start和end范围内链表元素
//-1为最后一个元素
client.lrange('tasks', 0, -1, function(err, items) {
  if (err) throw err; items.forEach(function(item, i) {
    console.log(' ' + item); });
});

//集合存储
client.sadd('ip_addresses', '204.10.37.96', redis.print);
//集合中的元素唯一，重复值被忽略
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '72.32.231.8', redis.print);
client.smembers('ip_addresses', function(err, members) {
if (err) throw err;
console.log(members);
});

