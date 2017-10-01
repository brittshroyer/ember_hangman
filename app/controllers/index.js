import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  auth: service(),

  actions: {

    signIn() {
      this.get('auth').login()

    }
  }
});
