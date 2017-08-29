import Ember from 'ember';

const {
  Route,
  inject: {
    service,
  },
  get,
} = Ember;

export default Route.extend({
  auth: service(),
  beforeModel() {
    if (get(this, 'auth.isAuthenticated')) {
      return;
    }

    return get(this, 'auth')
      .handleAuthentication()
      .then(() => {
        if (get(this, 'auth.isAuthenticated')) {
          this.transitionTo('play');
        }
      });
  }
});
