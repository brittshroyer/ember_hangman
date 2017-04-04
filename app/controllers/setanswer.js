import Ember from 'ember';

export default Ember.Controller.extend({
  //no need for name within parentheses if its the same
  signin: Ember.inject.controller(),
  topic: '',
  answer: ''
});
