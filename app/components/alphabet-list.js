import Ember from 'ember';

export default Ember.Component.extend({
  alphabetList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  isVisible: {
    if(document.getElementById('buttons').style.visibility == 'visibile'){
      return true;
    }
  }

});
