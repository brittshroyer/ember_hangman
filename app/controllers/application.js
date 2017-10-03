import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  auth: service(),

  actions: {

    signOut() {
      this.get('auth').logout();
      this.transitionTo('application');
    }
  }
});
