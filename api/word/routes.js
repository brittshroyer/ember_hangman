var express = require('express');
var router = express.Router();
var Word = require('./model');
var mongoose = require('mongoose');

router.get('/', function (req, res) {

  var payload = {};
  Word.aggregate( { $sample: { size: 1 } }, function(err, doc) {
    var word = doc[0].word,
        def = doc[0].def;

    if (err) {
      payload.err = err;
      console.log('error retrieving random document', err);
      res.status(400).send(payload);
    }

    payload.word = word;
    payload.def = def;
    res.status(201).send(payload);
  });

});

module.exports = router;
