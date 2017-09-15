var request = require('supertest');
var express = require('express');


var app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});

describe('GET /user', function() {
  it('user.name should be an case-insensitive match for "tobi"', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.name = res.body.name.toUpperCase();
      })
      .expect(200, {
        id: 'some fixed id',
        name: 'TOBI'
      }, done);
  });
});
