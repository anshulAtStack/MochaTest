var request = require('supertest');
var app = require('./server/app.js');

describe('User object model rest api', function(){
  var newUser = {
    username:'anshulc'
    image: 'url',
    email: 'anshulchanchlani@gmail.com'

  }

  it('Retrieve all users' function(done){
      request(app)
        .get('/api/v1/user/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res){
          if(err) { return err;}
          res.body.should.be.instanceOf(Array);
          res.body.length.should.be.exactly(0);
          done();
        })
  });

  it('Create all users', function(done){
    request(app)
    .post('/api/vi/user')
    .send(newUser)
    .expect(201)
    .expect('Content-Type','/json/')
    .end(function(err,res){
      if(err ){ return err}
      res.body.should.have.property('_id')
      res.body.should.have.property('username')
      res.body.username.should.be.exactly(newUser.username);
      res.body.should.have.property('email');
      res.body.email.should.be.exactly(newUser.email);
      done();
    })
  )
  })

  it('Retrieve all users',function(done){
    request(app)
    .get('/api/v1/user')
    .expect(200)
    .expect('Content-Type','/json/')
    .end(function(err,res){
      if(err){return done(err);}
      res.body.should.be.instanceOf(Array);
      res.body.length.should.be.exactly(1);
      check for properties again.
    })
  })

  it('Retrieve user with user id', function(done){
    reuqest(app)
      .get('/api/v1/user' + createdUserId)
      .expect(200)
      .expect('Content-Type', '/json/')
      .end(functiON(err,res){

      })
  })
})
