var express = require('express');
var router = express.Router();
var User = require('./model');
var mongoose = require('mongoose');


router.post('/', function getUser (req, res) {

  var payload = {};

  User.count({ picture: req.body.picture }, function(err, count) {
    if (count>0) {
      console.log('User already exists in DB');
      res.status(201).send(payload);
    } else {
      var userInfo = {
        name: req.body.name,
        picture: req.body.picture
      };
      var newUser = new User(userInfo);
      newUser.save(function(err, success) {
        if (err) {
          payload.errors = err;
          res.status(400).send(payload);
        } else {
          console.log('user saved to DB');
          res.status(201).send(payload);
        }
      });
    }
  });
});

router.get('/', function(req, res) {

  User.find({},'',function(err,post){
    if (err) console.error('Error getting', err);
    res.json(post);
  });


});


module.exports = router;
