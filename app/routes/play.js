import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  auth: service(),
  ajax: service(),

  beforeModel() {

    if (!this.get('auth.isAuthenticated')) {
      return this.replaceWith('application');
    }
  },

  model() {
    let token = this.get('auth').getSession().access_token,
        ajax = this.get('ajax');

    const currentUserPromise = new Promise((resolve, reject) => {
      this.get('auth.auth0').client.userInfo(token, (err, user) => {
        ajax.post('http://localhost:3000/users', {
          data: JSON.stringify({
            name: user.givenName || user.name,
            picture: user.picture
          }),
          contentType: 'application/json'
        }).then(response => {
          return this.store.findRecord('user', response.user['_id'])
          .then(response => {
            resolve(response);
          })
        }).catch(error => {
          console.log('error getting current user model', error);
          reject(response);
        });
      });
    });

    return currentUserPromise;

  },

  setupController(controller, model) {

    this._super(controller, model);

  },

});
