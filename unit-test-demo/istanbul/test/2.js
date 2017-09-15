var request = require('supertest');
var app = require('../sqrt.js');

describe("sqrt", function() {

  it("4的平方根应该等于2", function(done) {
	request(app)
		.expect(app.sqrt(4),2,done)
		
  });

});

