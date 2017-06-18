/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { Customers } from '../customers/customersCollection';

import './userMethods';

chai.should();

if (Meteor.isServer) {
  describe('User Methods', () => {
    let userId;
    beforeEach(() => {
      Meteor.users.remove({});
      userId = Meteor.users.insert({ profile: {} });
    });

    describe('users.favoriteCustomer', () => {
      let customerId;
      beforeEach(() => {
        Customers.remove({});
        customerId = Customers.insert({});
      });

      it('adds the customerId to the favorite customers array', () => {
        Meteor.call('users.favoriteCustomer', userId, customerId);
        Meteor.users.findOne(userId).profile.favoriteCustomers.length
              .should.equal(1);
        Meteor.users.findOne(userId).profile.favoriteCustomers[0]
          .should.equal(customerId);
      });

      it('throws an error if the userId is invalid', function () {
        this.timeout(10000);
        (() => Meteor.call('users.favoriteCustomer', 'x', customerId))
          .should
          .throw(Error);
      });

      it('throws an error if the customerId is invalid', () => {
        (() => Meteor.call('users.favoriteCustomer', userId, 'x'))
          .should
          .throw(Error);
      });

      it('throws an error if the customerId is already a favorite', () => {
        Meteor.call('users.favoriteCustomer', userId, customerId);
        (() => Meteor.call('users.favoriteCustomer', userId, customerId))
          .should
          .throw(Error);
      });
    });
  });
}
