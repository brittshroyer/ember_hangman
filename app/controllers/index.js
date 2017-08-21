import Ember from 'ember';

const {
  Controller,
  inject: {
    service,
  },
  get,
} = Ember;

export default Controller.extend({
  auth: service(),

  pname: '',
  executioner: '',

  actions: {
    signIn() {
      get(this, 'auth').login();
    }
    // navigateOnEnter(){
    //   Ember.$('#btn_signin').click();
    // }
  }
});
