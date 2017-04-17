import Ember from 'ember';

export default Ember.Controller.extend({
  save: function(){
    let p1name = this.get('p1name');
    let p2name = this.get('p2name');
    console.log(p1name + ' vs ' + p2name);
  }
});
