import Ember from 'ember';

export default Ember.Component.extend({
  finalArray: [],
  actions: {
    generateGuessField(val){
      //show alphabet
      document.getElementById('buttons').style.visibility = 'visible';
      //hide elements and clear input field
      document.getElementById('set-answer').style.visibility = 'hidden';
      document.getElementById('answer-input-field').value = '';
      let newArray = val.split('');
      for(let i=0; i<newArray.length; i++){
        if(newArray[i] != ' '){
          this.get('finalArray').pushObject({
            value: newArray[i],
            visible: false,
            placeholder: '_'
          });
        }else{
          this.get('finalArray').pushObject({
            placeholder: '*'
          });
        }
      }
    }
  }
});
//loop through newArray and create a new object for each item
