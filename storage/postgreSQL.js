var pg = require('pg');
//连接postgresql
var conString = "tcp://myuser:mypassword@localhost:5432/mydatabase";
var client = new pg.Client(conString);
client.connect();
//插入一条记录
client.query(
	'INSERT INTO users ' +
	"(name) VALUES ('Mike1')"
);
//$1,$2占位符
client.query(
	"INSERT INTO users " +
	"(name, age) VALUES ($1, $2)", ['Mike2', 39]
);
//插入数据后得到主键
client.query(
	"INSERT INTO users " +
	"(name, age) VALUES ($1, $2) " +
	"RETURNING id", ['Mike3', 39],
	function(err, result) {
		if (err) throw err;
		console.log('Insert ID is ' + result.rows[0].id);
	}
);
//选择记录
var query = client.query(
	"SELECT * FROM users WHERE age > $1", [40]
);
//处理返回的记录
query.on('row', function(row) {
	console.log(row.name)
});
//完成
query.on('end', function() {
	client.end();
});