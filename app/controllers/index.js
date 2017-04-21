import Ember from 'ember';

export default Ember.Controller.extend({
  executioner:'',
  pname: '',
  actions: {
    navigateOnEnter(){
      Ember.$('#btn_signin').click();
    }
  }
});
