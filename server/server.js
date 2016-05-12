var express = require('express');
var app = express();
var host = 'http://localhost:3000';
app.use(require('body-parser').json());
var userMap ={};
app.get('/quizArt/api/v1/account',function(req,res){
  var account = [];
  for(var key in userMap)
  {
    account.push(userMap[key]);
  }
    return res.status(200).json(account);
})

  module.exports = app;
