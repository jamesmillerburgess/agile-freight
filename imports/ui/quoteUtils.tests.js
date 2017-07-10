/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import Quote from './quoteUtils';

chai.should();

if (Meteor.isClient) {
  describe('Quote Utilities', () => {
    describe('Quote.getRates', () => {

    });
  });
}