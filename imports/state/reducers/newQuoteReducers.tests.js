/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';

import { newQuote } from './newQuoteReducers';

if (Meteor.isClient) {
  describe('New Quote Reducers', () => {
    chai.should();
    it('defaults the three sections', () => {
      const newNewQuote = newQuote();

      newNewQuote.should.have.property('cargo');
      newNewQuote.should.have.property('movement');
      newNewQuote.should.have.property('otherServices');
    });
  });
}
