import Ember from 'ember';

export default Ember.Component.extend({
  finalArray: [],
  actions: {
    add(val){
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
      console.log('Array of Objects', this.get('finalArray'));
      let objectArray = this.get('finalArray');

    }
  }

});
//loop through newArray and create a new object for each item
