import Ember from 'ember';
import config from 'ember-calculator/config/environment';

const {
  computed,
  Service,
  get
} = Ember;

export default Service.extend({
  auth0: computed(function () {
    return new auth0.WebAuth({
      domain: 'brittshroyer.auth0.com',
      clientID: 'Qs3i7ek3ntiYKU4PKBHqe26HYhNEMv98',
      redirectUri: 'http://localhost:4200/play',
      audience: 'https://brittshroyer.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    });
  }),

  login() {
    get(this, 'auth0').authorize();
  }
});
