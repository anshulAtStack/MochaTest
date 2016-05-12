var express = require('express')
var app = express();

module.exports = app;
//Config db url
// To mongo://localhost:27017/quizART-dev when in dev
// To mongo://localhost:27017/quizART-test when in test
// To mongo://localhost:27017/quizART-production when in production

var env = process.ev.NODE_ENV || 'dev'
if(env==='dev'){
  // To mongo://localhost:27017/quizART-dev
}
else if(env === 'test'){
//  To mongo://localhost:27017/quizART-test
  //Clear database.
}
else if(env === 'production'){
  To mongo://localhost:27017/quizART-production
}

app.use(require('body-parser').json());
var userMap ={};
var lastUserId = -1;
app.get('/api/v1/user',function(req,res){
  var users = [];
  for(var key in userMap)
  {
    users.push(userMap[key]);
  }
  return  res.status(200).json(users);
});

app.get('/api/v1/user/:id',function(erq,res){
    if(!userMap[req.params.id]){
      req.status(404).send();
    }
    return res.status(200).json(userMap[req.params.id]);
})
app.post('/api/v1/user/:id',function(req,res){
  var newId = ++lastUserId;
  req.body._id= newId;
  return userMap[newId]
})
export = module.exports = app;
