var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String },
  picture: {type: String },
  points: {type: Number},
  streak: {type: Number},
  versionKey: false
});

var User = mongoose.model('User', schema);

module.exports = User;
