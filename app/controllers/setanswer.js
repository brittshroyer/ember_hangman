import Ember from 'ember';

export default Ember.Controller.extend({
  index: Ember.inject.controller(),
  alphabetList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
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
        if(newArray[i] !== ' '){
          let letterObject = Ember.Object.create({
            character: newArray[i],
            placeholder: '**',
            showing: this.placeholder
          });
          this.get('finalArray').pushObject(letterObject);
        }else{
          let letterSpaceObject = Ember.Object.create({
            character: newArray[i],
            placeholder: '*',
            showing: this.placeholder
          });
          this.get('finalArray').pushObject(letterSpaceObject);
        }
      }
    }
  }
});
