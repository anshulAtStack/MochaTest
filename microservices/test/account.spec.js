var request = require('supertest');
var app = require('../../server/server.js');
var should = require('should');

//Server object will hit our db.json running at localhost
var server = request.agent("http://localhost:3000");


var createdUserId,  //after post the id received will be assigned to this.
            newUser,  // newUser object that has to be posted or created.
            updatedUser, //user object that has to be sent for update
            patchedUser;  // patched object for the patch request.
describe('Account Model REST API',function(){

  //Will retrieve all the users. I have ommitted the number of users
  //that has to be returned.
  it('Retrieve all users',function(done){
    server
      .get('/account')  //account is our entity name.
      .expect(200)  //if successful get will return a status code of 200
      .expect('Content-Type', /json/) //with a content type of json
      .end(function(err,res){
        if(err)
          return done(err); // if error. done with err object.

          res.body.should.be.instanceOf(Array);
          // the returned res should have body and that should be of type array.

          done();
          // if everything is good.call this function to state that your
          //test case has passed

      })
  })

  //Create a user. id must not be provided while creating a user
  // It is the duty of server to create the id.
  it('Create a user',function(done){

    // New user object that has to be created in db.json
     newUser = {

      "username": "deepak",
      "secret": "deepakKaSecret",
      "role": "admin",
      "isActive": false
    }

    //server request to send a post request.
    server
    .post('/account')
    .set('Content-Type','application/json')
    .send(newUser)  // send the newUser object along with the post request
    .expect(201)  // post sends a 201 status code after successful completion.
    .expect('Content-Type',/json/)
    .end(function(err,res){
      if(err){return done(err)}
      else
      {
        // compares the return user object with the object passed for creation.
        if(compareUsers(res,newUser))
        {
          createdUserId = res.body.id;  //assign the newly created object's id.

          done(); //test case passes.
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
    //checking so that the new user object has all the req fields.
    updatedUser.should.have.property('username');
    updatedUser.should.have.property('secret');
    updatedUser.should.have.property('role');
    updatedUser.should.have.property('isActive');
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
    //checking so that the new user object has all the req fields.
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

//check that the returned object has all the properties and correct values.
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
