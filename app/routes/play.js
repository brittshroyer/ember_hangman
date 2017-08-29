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
  ajax: service(),

  beforeModel() {

    // return this.get('auth').logout();
    
    let ajax = this.get('ajax');
    let that = this;
    if (!get(that, 'auth.isAuthenticated')) {
      return that.replaceWith('application');
    }
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.get('auth.auth0').client.userInfo(that.get('auth.authResult').accessToken, (err, user) => {
        console.log('USER', user);
        ajax.post('http://localhost:3000/users', {
          data: JSON.stringify({
            name: user.givenName,
            picture: user.picture
          }),
          contentType: 'application/json'
        })
        .then(function(response) {
          Ember.run(function() {
            resolve(response);
          });
        })
        .catch(function(error) {
          Ember.run(function() {
            reject(error);
          });
        });
      });
    });
  },

  model() {
    return this.store.findAll('user');
  },

  setupController(controller, model) {
    this._super(controller, model);
  }
  // function getAuth0UserInfo() {
  //   let ajax = this.get('ajax');
  //
  //   return new Ember.RSVP.Promise(function(resolve, reject) {
  //     this.get('auth.auth0').client.userInfo(this.get('auth.authResult').accessToken, (err, user) => {
  //       ajax.post('http://localhost:3000/users', {
  //         data: JSON.stringify({
  //           first_name: user.firstName,
  //           last_name: user.lastName,
  //           email: user.email
  //         }),
  //       })
  //       .then(function(response) {
  //         Ember.run(function() {
  //           resolve(response);
  //         });
  //       })
  //       .catch(function(error) {
  //         Ember.run(function() {
  //           reject(error);
  //         });
  //       });
  //     });
  //   });
  //   // return this.get('auth.auth0').client.userInfo(this.get('auth.authResult').accessToken, (err, user) => {
  //   //   return this.set('picture', user.picture);
  //   // });
  // }
});
