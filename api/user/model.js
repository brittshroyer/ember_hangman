var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String },
  picture: {type: String },
  versionKey: false
});

var User = mongoose.model('User', schema);

module.exports = User;
