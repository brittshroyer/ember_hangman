import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  auth: service(),

  beforeModel() {

    if (this.get('auth.isAuthenticated')) {
      return;
    }
    return this.get('auth').handleAuthentication()
    .then(() => {
      if (this.get('auth.isAuthenticated')) {
        this.transitionTo('play');
      } else {
        console.log('fuck');
      }
    });
  },

  // model() {
  //   console.log('authResult', this.get('auth.authResult'));
  // }
});
