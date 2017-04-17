import Ember from 'ember';

export default Ember.Controller.extend({
  index: Ember.inject.controller(),
  alphabetList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  bodyParts: ['lleg', 'rleg', 'rarm', 'larm', 'body', 'head'],
  guesses: 6,
  dead: false,
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
            placeholder: '_',
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
    },
    controllerCheckAnswer(letter) {
      console.log('yooo', letter);
      // let letter = this.let;
      let count = -1;
      let guesses = this.get('guesses');
      let answer = this.get('finalArray');
      let limbs = this.get('bodyParts');
      let dead = this.get('dead');
      let characters = [];
      answer.forEach(function(e){
        if(e.character === letter.toUpperCase() || e.character === letter){
          console.log('%j', e.character);
          e.set('placeholder', e.character);
          count = 0;
        }
      });
      if(count !== 0){
        let currentLimb = limbs[guesses - 1];
        this.set('guesses', guesses-1);
        document.getElementById(currentLimb).style.visibility = 'visible';
      }
      if(guesses === 1){
        this.set('dead', true);
      }
    }
  }
});
