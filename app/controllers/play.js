import Ember from 'ember';

export default Ember.Controller.extend({
  settopic: Ember.inject.controller(),
  index: Ember.inject.controller(),
  alphabetList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  alphabet: function(){
    return this.get('alphabetList');
  }.property('guesses'),
  bodyParts: ['lleg', 'rleg', 'rarm', 'larm', 'body', 'head'],
  wrongGuesses: 6,
  guesses: 0,
  dead: false,
  winner: false,
  end: false,
  finalArray: [],
  placeholders: [],
  actions: {
    startOnEnter(){
      Ember.$('#start_btn').click();
    },
    generateGuessField(val){
      //show alphabet
      document.getElementById('buttons').style.visibility = 'visible';
      document.getElementById('title').style.marginTop = '20px';

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
            placeholder: String.fromCharCode(160),
            showing: this.placeholder
          });
          this.get('finalArray').pushObject(letterSpaceObject);
        }
      }
    },
    controllerCheckAnswer(letter) {
      let alphabet = this.get('alphabetList');
      let count = -1;
      let guesses = this.get('guesses');
      this.set('guesses', guesses + 1);
      let wrongGuesses = this.get('wrongGuesses');
      let answer = this.get('finalArray');
      let limbs = this.get('bodyParts');
      let dead = this.get('dead');
      let placeholders = this.get('placeholders');
      //hide chosen letters
      let index = alphabet.indexOf(letter.toLowerCase());
      alphabet.splice(index, 1);

      answer.forEach(function(e){
        if(e.character === letter.toUpperCase() || e.character === letter){
          e.set('placeholder', e.character);
          count = 0;
        }
      });
      if(count !== 0){
        let currentLimb = limbs[wrongGuesses - 1];
        this.set('wrongGuesses', wrongGuesses-1);
        document.getElementById(currentLimb).style.visibility = 'visible';
      }
      if(wrongGuesses === 1){
        this.set('dead', true);
        this.set('end', true);
        document.getElementById('guess-letters').style.marginTop = '-10vh';
      }
      let checkWinner = function(e){
        return e !== '_';
      }
      this.set('placeholders', []);
      for(let i=0, x=answer.length; i<x; i++){
        placeholders.push(answer[i].placeholder);
      }
      console.log('placeholders', placeholders);
      if(placeholders.every(checkWinner)){
        console.log('WINNER');
        this.set('end', true);
        this.set('winner', true);
        document.getElementById('guess-letters').style.marginTop = '-10vh';
      }
    }
  }
});
