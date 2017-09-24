import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  auth: service(),
  ajax: service(),

  beforeModel() {

    // let authResult = this.get('auth.authResult'),
    //     ajax = this.get('ajax');

    // this.get('auth').logout();

    if (!this.get('auth.isAuthenticated')) {
      return this.replaceWith('application');
    }

    // if (!authResult) {
    //   return;
    // }
    //
    // this.get('auth.auth0').client.userInfo(authResult.accessToken, (err, user) => {
    //   ajax.post('http://localhost:3000/users', {
    //     data: JSON.stringify({
    //       name: user.givenName,
    //       picture: user.picture
    //     }),
    //     contentType: 'application/json'
    //   })
    //   .then(response => {
    //     console.log('RESPONSE ID', response.id);
    //     this.set('currentUserID', response.id);
    //     // return response.id;
    //   })
    //   .catch(function(error) {
    //     console.log('error', error);
    //   });
    // });
  },

  model() {
    let authResult = this.get('auth.authResult'),
        ajax = this.get('ajax');

    if (!authResult) {
      return;
    }

    return this.store.findAll('user');

    this.get('auth.auth0').client.userInfo(authResult.accessToken, (err, user) => {
      let name = user.name;
      ajax.post('http://localhost:3000/users', {
        data: JSON.stringify({
          name: user.givenName,
          picture: user.picture
        }),
        contentType: 'application/json'
      })
      .then(response => {
        // console.log('RESPONSE ID', response.id);
        // let banana = 'banana';
        let usersPromise = this.store.findAll('user');
        return Ember.RSVP.hash({
          users: usersPromise,
          name: name
        });
      })
      .catch(function(error) {
        console.log('error', error);
      });
    });

  },

  setupController(controller, models) {
    controller.setProperties({
      name: models.name,
      users: models.users
    });
  }

});
