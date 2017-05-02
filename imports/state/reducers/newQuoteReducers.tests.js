/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';

import { newQuote } from './newQuoteReducers';

chai.should();

describe('New Quote Reducers', () => {
  it('defaults the three sections', () => {
    const newNewQuote = newQuote();

    newNewQuote.should.have.property('cargo');
    newNewQuote.should.have.property('movement');
    newNewQuote.should.have.property('otherServices');
  });
});
