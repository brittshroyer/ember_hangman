import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    checkAnswer(letter) {
      // call controller action called controllerCheckAnswer
      // and send along the letter
      this.sendAction('action', letter);
    }
  }


});
