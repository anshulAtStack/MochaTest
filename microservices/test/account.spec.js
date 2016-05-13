var request = require('supertest');
var app = require('../../server/server.js');
var should = require('should');
var server = request.agent("http://localhost:3000");
var createdUserId,newUser,updatedUser,patchedUser;
describe('Account Model REST API',function(){


  it('Retrieve all users',function(done){
    server
      .get('/account')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err,res){
        if(err)
          return done(err);

          res.body.should.be.instanceOf(Array);

          done();

      })
  })

  it('Create a user',function(done){
     newUser = {

      "username": "deepak",
      "secret": "deepakKaSecret",
      "role": "admin",
      "isActive": false
    }
    server
    .post('/account')
    .send(newUser)
    .expect(201)
    .expect('Content-Type',/json/)
    .end(function(err,res){
      if(err){return done(err)}
      else
      {
        if(compareUsers(res,newUser))
        {
          createdUserId = res.body.id;

          done();
        }
      }
    })

  })

  it('Retrieve a user with id',function(done){
    server
      .get('/account/'+createdUserId)
      .expect(200)
      .expect('Content-Type',/json/)
      .end(function(err,res){
        if(err){return done(err)}
          if(compareUsers(res,newUser))
            {
              done();
            }
      })
  })

  it('Update a user with id', function(done){
    updatedUser={
      "username": "deepak",
      "secret": "deepakKaSecret",
      "role": "admin",
      "isActive": true
    }
    server
      .put('/account/'+createdUserId)
      .send(updatedUser)
      .expect(200)
      .expect('Content-Type',/json/)
      .end(function(err,res){
        if(err){return done(err)}
        else
        {
          if(compareUsers(res,updatedUser))
          done();
        }
      })
  })

  it('Patch a user with id', function(done){
    patchedUser ={
      "username": "deepak",
      "secret": "deepakKaSecret",
      "role": "admin",
      "isActive": true
    }
    patchedUser.should.have.property('username');
    patchedUser.should.have.property('secret');
    patchedUser.should.have.property('role');
    patchedUser.should.have.property('isActive');

    server
      .patch('/account/'+createdUserId)
      .send(patchedUser)
      .expect(200)
      .expect('Content-Type',/json/)
      .end(function(err,res){
        if(err)
        {
          return done(err);
        }
        else{
          if(compareUsers(res,patchedUser))
            done();
        }
      })
  })

})


function compareUsers(res,newUser){
  try{
  res.body.should.have.property('id');
  res.body.should.have.property('username');
  res.body.username.should.be.exactly(newUser.username);
  res.body.should.have.property('secret');
  res.body.secret.should.be.exactly(newUser.secret);
  res.body.should.have.property('role');
  res.body.role.should.be.exactly(newUser.role);
  res.body.should.have.property('isActive');
  res.body.isActive.should.be.exactly(newUser.isActive);

  return true;
}
catch(e){
  console.log(e);
  return false;
}
}
