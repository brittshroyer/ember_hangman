import Ember from 'ember';

export default Ember.Controller.extend({
  save: function(){
    if(this.get('p1name') === ''){
      console.log('yo');
    }
    let p1name = this.get('p1name');
    let p2name = this.get('p2name');
  }
});
