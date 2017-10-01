import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  auth: service(),
  ajax: service(),

  beforeModel() {
    if (this.get('auth.isAuthenticated')) {
      return;
    }

    return this.get('auth')
      .handleAuthentication()
      .then(() => {
        if (this.get('auth.isAuthenticated')) {
          //is this redirecting to play or is the redirect URI in the auth service??
          this.transitionTo('play');
        }
      });
  }


});

// authenticated  -  are you authenticated? if so, set authenticaed user as model (modelFor('authenticated'))
  // layout   -  are you a client or a user? Depending on which, we redirect you
    // everything else   -   you were redirected here
