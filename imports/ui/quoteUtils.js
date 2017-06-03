import { Meteor } from 'meteor/meteor';

export const copyQuote = (quoteId, cb) => {
  Meteor.call('quote.copy', quoteId, cb);
};
