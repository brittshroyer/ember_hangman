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
        if (err) {
          payload.err = err;
          res.status(400).send(payload);
        }
        payload['user'] = document;
        res.status(201).send(payload);
      });
    } else {
      var userInfo = {
        name: req.body.name,
        picture: req.body.picture,
        points: 0,
        streak: 0
      };
      var newUser = new User(userInfo);
      console.log('newUser', newUser);
      newUser.save(function(err, success) {
        if (err) {
          payload.errors = err;
          res.status(400).send(payload);
        } else {
          console.log('user saved to DB');
          payload['user'] = newUser;
          res.status(201).send(payload);
        }
      });
    }
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  User.findById(id).exec().then(function(userDoc) {
    res.json({user: userDoc});
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

router.put('/:id', function(req, res) {

  var payload = {};

  User.findOneAndUpdate({ _id: req.params.id },
    req.body.user,
    {
      upsert: true,
      new: true
    },
    function returnDoc(err, userDoc) {
      if (err) {
        payload.error = err;
        res.status(400).send(payload);
      } else {
        payload.user = userDoc;
        res.status(200).send(payload);
      }
    }
  );

});


module.exports = router;
