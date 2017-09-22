var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  word: { type: String },
  def: {type: String },
  versionKey: false
});

var Word = mongoose.model('Word', schema);

module.exports = Word;
