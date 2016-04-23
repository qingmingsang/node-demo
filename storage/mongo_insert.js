var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('mydatabase', server, {
	w: 1
});

client.open(function(err) {
	if (err) throw err;
	
	client.collection('test_insert', function(err, collection) {
		if (err) throw err;
//插入
		collection.insert({
				"title": "I like cake",
				"body": "It is quite good."
			},
			//安全模式
			{
				safe: true
			},
			function(err, documents) {
				if (err) throw err;
				//查询
				console.log('Document ID is: ' + documents[0]._id);
			}
		);
	});
});