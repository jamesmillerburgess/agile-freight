import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Quotes } from '../quotesCollection';

Meteor.publish('quotes.list', (list = []) => {
  check(list, Array);
  return Quotes.find({ _id: { $in: list } });
});
