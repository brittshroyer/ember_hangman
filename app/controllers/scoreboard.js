import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    transitionToPlay() {
      this.transitionToRoute('play');
    }
  }
});
