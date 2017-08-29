import Ember from 'ember';

const {
  Route,
  get,
  inject: {
    service,
  }
} = Ember;

export default Route.extend({
  auth: service(),

  beforeModel() {
    //skip past login screen if already logged in
    if (get(this, 'auth.isAuthenticated')) {
      this.transitionTo('play');
    }
  }
});
