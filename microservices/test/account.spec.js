var request = require('supertest');
var app = require('../../server/server.js');
var should = require('should');

describe('Account Model REST API',function(){

  it('Retrieve all users',function(done){
    request(app)
      .get('/quizArt/api/v1/account')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err,res){
        if(err)
          return done(err);

          res.body.should.be.instanceOf(Array);
          res.body.length.should.be.exactly(0);
          done();

      })
  })
})
