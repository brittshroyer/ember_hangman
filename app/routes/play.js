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

    // this.get('auth').logout();

    if (!get(this, 'auth.isAuthenticated')) {
      return this.replaceWith('application');
    }

  },

  model() {
    return this.store.findAll('user');
  },

  afterModel(controller, model) {

    let picture = this.get('auth.authResult.idTokenPayload.picture');
    return this.store.query('user', {
      filter: {
        picture: picture
      }
    }).then(arr => {
      controller.set('currentUser', arr.get('firstObject'));
    });
  },

  setupController(controller, model) {
    controller.set('user', model);
  }

});
