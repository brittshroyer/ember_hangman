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

  authResult: null,

  auth0: computed(function () {
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
    // get(this, 'auth0');
  },

//called at application level
//if user is not authenticated (lacks a token) then we set a new session using parsed hash
  handleAuthentication() {

    return new RSVP.Promise((resolve, reject) => {
      get(this, 'auth0').parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          this.set('authResult', authResult);
          // this.setUserPicture();
        } else if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  },

  // setUserPicture() {
  //   get(this, 'auth0').client.userInfo(authResult.accessToken, function (err, user) {
  //     this.set('model.picture', user.picture);
  //   });
  // },

  getSession() {
    return {
      access_token: localStorage.getItem('access_token'),
      id_token: localStorage.getItem('id_token'),
      expires_at: localStorage.getItem('expires_at')
    };
  },

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
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
