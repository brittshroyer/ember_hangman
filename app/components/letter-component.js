import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    checkAnswer(){
      let answer = this.answer;
      let letter = this.let;
      answer.forEach(function(e){
        if(e.character === letter){
          console.log('%j', e);
          e.set('showing', e.character);
          // answer.forEach(function(e){
          //   e.
          // })
        }
      });
    }
  }
});
