import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    checkAnswer(){
      let answer = this.answer;
      let letter = this.let;
      answer.forEach(function(e){
        if(e.value == letter){
          console.log('%j', answer[0].placeholder);
          answer[0].Set('showing', answer.value);
          // answer.forEach(function(e){
          //   e.
          // })
        }
      });
    }
  }
});
