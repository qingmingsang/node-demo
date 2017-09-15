var request = require('supertest');
var express = require('express');


var app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});

describe('GET /user', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});