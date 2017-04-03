import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('signin', { path: '/signin'});
    this.route('setanswer', { path: '/setanswer'});
    this.route('play');
    this.route('results');
});

export default Router;
