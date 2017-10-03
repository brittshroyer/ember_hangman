import Ember from 'ember';

const {
  inject: {
    service,
  },
  computed
} = Ember;

export default Ember.Controller.extend({
  auth: service(),
  ajax: service(),

  bodyParts: ['lleg', 'rleg', 'rarm', 'larm', 'body', 'head'],
  wrongGuesses: 6,
  guesses: 0,
  dead: false,
  winner: false,
  end: false,
  wordToPresent: null,
  placeholders: [],
  alphabetList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

  showLetters: false,
  word: null,
  definition: null,
  displayGuessField: true,
  currentStreak: 0,

  showBase: computed.lt('wrongGuesses', 6),
  showUpright: computed.lt('wrongGuesses', 5),
  showCrossbar: computed.lt('wrongGuesses', 4),
  showNoose: computed.lt('wrongGuesses', 3),
  showRope: computed.lt('wrongGuesses', 2),
  showEyes: computed.lt('wrongGuesses', 1),

  alphabet: computed('guesses', function() {
    return this.get('alphabetList');
  }),


  createGuessField(word, definition) {
    let characters = word.split(''),
        i,
        letter,
        space,
        wordToPresent = [];

    this.set('wordToPresent', wordToPresent);
    this.set('definition', definition);

    for (i=0; i<characters.length; i++) {
      if (characters[i] !== ' ') {
        letter = Ember.Object.create({
          character: characters[i],
          placeholder: '_',
          isNotSpace: true
        });
        wordToPresent.pushObject(letter);

      } else {
        space = Ember.Object.create({
          character: characters[i],
          placeholder: String.fromCharCode(160),
          isNotSpace: false
        });
        wordToPresent.pushObject(space);
      }
    }
  },

  displayDefinition: computed('definition', function() {
    return this.get('definition');
  }),

  resetGame() {
    this.set('alphabetList', ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
  },

  showAnswer() {
    let answer = this.get('wordToPresent');

    answer.forEach(e => {
      e.set('placeholder', e.character);
    });
  },

  updateScore() {
    let points = this.get('model.points'),
        bestStreak = this.get('model.streak'),
        model = this.get('model'),
        newTotal = points + 10,
        currentStreak = this.get('currentStreak');

    if (currentStreak > bestStreak) {
      this.set('model.streak', currentStreak);
    }

    this.set('model.points', newTotal);

    model.save();
  },


  actions: {

    transitionToScoreboard() {
      this.transitionToRoute('scoreboard');
    },

    signOut() {
      this.get('auth').logout();
      this.transitionToRoute('application');
    },

    getWord() {
      let ajax = this.get('ajax');
      this.set('end', false);
      this.set('wrongGuesses', 6);

      ajax.request('http://localhost:3000/words')
      .then(response => {
        let word = response.word,
            definition = response.def;
        this.createGuessField(word, definition);
      });
    },

    checkAnswer(letter) {
      let alphabet = this.get('alphabetList'),
          count = -1,
          guesses = this.get('guesses'),
          wrongGuesses = this.get('wrongGuesses'),
          answer = this.get('wordToPresent'),
          placeholders = this.get('placeholders'),
          index = alphabet.indexOf(letter.toLowerCase());

      if (!this.get('definition')) {
        return;
      }

      let checkWinner = function(e){
        return e !== '_';
      };

      this.set('guesses', guesses + 1);
      alphabet.splice(index, 1);

      answer.forEach(e => {
        if (e.character === letter.toUpperCase() || e.character === letter) {
          e.set('placeholder', e.character);
          count = 0;
        }
      });

      if (count === -1) {
        this.set('wrongGuesses', wrongGuesses-1);
      }

      this.set('placeholders', []);

      for (let i=0, x=answer.length; i<x; i++) {
        placeholders.push(answer[i].placeholder);
      }

      if (placeholders.every(checkWinner)) {
        let currentStreak = this.get('currentStreak'),
            newStreak = currentStreak + 1;

        this.set('currentStreak', newStreak);
        this.set('end', true);
        this.set('winner', true);
        this.updateScore();
        this.resetGame();
      }

      if (count !== 0 && wrongGuesses <= 1) {
        this.set('currentStreak', 0);
        this.set('dead', true);
        this.set('end', true);
        this.resetGame();
        this.showAnswer();
      }
    }
  }

});
