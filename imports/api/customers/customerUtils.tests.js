/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import * as customerUtils from './customerUtils';

chai.should();

if (Meteor.isServer) {
  describe('Customer Utilities', () => {
    describe('compareCustomers', () => {
      const { compareCustomers } = customerUtils;
      const a                    = { _id: 'a' };
      const b                    = { _id: 'b' };

      it('returns 0 when neither customer is a favorite', () => {
        const userId = Meteor.users.insert({
          profile: {
            favoriteCustomers: [],
          },
        });
        const user   = Meteor.users.findOne(userId);
        compareCustomers(a, b, user).should.equal(0);
      });

      it('returns 0 when both customers are a favorite', () => {
        const userId = Meteor.users.insert({
          profile: {
            favoriteCustomers: ['a', 'b'],
          },
        });
        const user   = Meteor.users.findOne(userId);
        compareCustomers(a, b, user).should.equal(0);
      });

      it('returns -1 when a is a favorite, but b is not', () => {
        const userId = Meteor.users.insert({
          profile: {
            favoriteCustomers: ['a'],
          },
        });
        const user   = Meteor.users.findOne(userId);
        compareCustomers(a, b, user).should.equal(-1);
      });

      it('returns 1 when b is a favorite, but a is not', () => {
        const userId = Meteor.users.insert({
          profile: {
            favoriteCustomers: ['b'],
          },
        });
        const user   = Meteor.users.findOne(userId);
        compareCustomers(a, b, user).should.equal(1);
      });
    });
  });
}
