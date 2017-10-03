import Ember from 'ember';

import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  picture: attr('string'),
  name: attr('string'),
  points: attr('number'),
  streak: attr('number')
});
