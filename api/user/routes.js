var express = require('express');
var router = express.Router();
var User = require('./model');
var mongoose = require('mongoose');


router.post('/', function getUser (req, res) {

  var payload = {};

  User.count({ picture: req.body.picture }, function(err, count) {
    if (count>0) {
      console.log('User already exists in DB');
      User.findOne({ picture: req.body.picture }, function(err, document) {
        console.log('document', document);
        if (err) {
          payload.err = err;
          res.status(400).send(payload);
        }
        payload['id'] = document._id;
        res.status(201).send(payload);
      });
    } else {
      var userInfo = {
        name: req.body.name,
        picture: req.body.picture
      };
      var newUser = new User(userInfo);
      console.log('newUser', newUser);
      newUser.save(function(err, success) {
        if (err) {
          payload.errors = err;
          res.status(400).send(payload);
        } else {
          console.log('user saved to DB');
          //need to send id back here too
          res.status(201).send(payload);
        }
      });
    }
  });
});

router.get('/', function(req, res) {

  var payload = {users: []};

  User.find({},'',function(err,post){
    if (err) {
      console.error('Error getting', err);
    }
    post.forEach(function(post) {
      payload.users.push(post);
    });
    res.send(payload);
  });

});


module.exports = router;
