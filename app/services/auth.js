import Ember from 'ember';
import config from 'ember-calculator/config/environment';


const {
  computed,
  Service,
  get,
  RSVP,
  isPresent
} = Ember;

export default Service.extend({

  auth0: computed(function() {
    return new auth0.WebAuth({
      domain: 'brittshroyer.auth0.com',
      clientID: 'Qs3i7ek3ntiYKU4PKBHqe26HYhNEMv98',
      redirectUri: 'http://localhost:4200/play',
      audience: 'https://brittshroyer.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile'
    });
  }),

  //does the user have an unexpired access token?
  isAuthenticated: computed(function() {
    return isPresent(this.getSession().access_token) && this.isNotExpired();
  }).volatile(),

  login() {
    get(this, 'auth0').authorize();
  },

//called at application level
  handleAuthentication() {

    return new RSVP.Promise((resolve, reject) => {
      this.get('auth0').parseHash((err, authResult) => {


        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          // this.get('auth0').client.userInfo(authResult.accessToken, (err, user) => {
          //   ajax.post('http://localhost:3000/users', {
          //     data: JSON.stringify({
          //       name: user.givenName,
          //       picture: user.picture
          //     }),
          //     contentType: 'application/json'
          //   })
          //   .then(response => {
          //     // console.log('%j', Object);
          //     return response;
          //
          //   })
          //   .catch(function(error) {
          //     console.log('error', error);
          //     Ember.run(function() {
          //       reject(error);
          //     });
          //   });
          // });

        } else if (err) {
          return reject(err);
        }

        return resolve();
      });
    });

  },



  getSession() {
    return {
      access_token: localStorage.getItem('access_token'),
      id_token: localStorage.getItem('id_token'),
      expires_at: localStorage.getItem('expires_at'),
      currentUser: localStorage.getItem('currentUser')
    };
  },

  setSession(authResult) {
    let currentUser = this.get('auth0').client.userInfo(authResult.accessToken, (err, user) => {
      return user.name;
    });
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.setItem('currentUser', currentUser);
    }
  },

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  },

  isNotExpired() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.getSession().expires_at;
    return new Date().getTime() < expiresAt;
  }


});
