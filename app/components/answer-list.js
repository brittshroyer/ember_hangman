import Ember from 'ember';

export default Ember.Component.extend({
  finalArray: ['hello'],
  actions: {
    add(val){
      let newArray = val.split('');
      // console.log('answer array', newArray);
      for(let i=0; i<newArray.length; i++){
        this.get('finalArray').pushObject({
          value: newArray[i],
          visible: false
        });
      }
      console.log('Array of Objects', this.get('finalArray'));
      let objectArray = this.get('finalArray');
    }
  }

});
//loop through newArray and create a new object for each item
