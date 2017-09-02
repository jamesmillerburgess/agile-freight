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
    describe('users.save', () => {
      Meteor.users.remove({});
      userId = Meteor.users.insert({ profile: {} });
      it('saves changes to the user name', () => {
        Meteor.call('users.save', userId, { name: 'a' });
        Meteor.users.findOne(userId).profile.name.should.equal('a');
      });
    });
    describe('users.favoriteCustomer', () => {
      let userId;
      let customerId;
      beforeEach(() => {
        Meteor.users.remove({});
        userId = Meteor.users.insert({ profile: {} });
        Customers.remove({});
        customerId = Customers.insert({});
      });

      it('adds the customerId to the favorite customers array', () => {
        Meteor.call('users.favoriteCustomer', userId, customerId);
        Meteor.users
          .findOne(userId)
          .profile.favoriteCustomers.length.should.equal(1);
        Meteor.users
          .findOne(userId)
          .profile.favoriteCustomers[0].should.equal(customerId);
      });

      it('throws an error if the userId is invalid', function() {
        this.timeout(10000);
        (() =>
          Meteor.call('users.favoriteCustomer', 'x', customerId)).should.throw(
          Error,
        );
      });

      it('throws an error if the customerId is invalid', () => {
        (() => Meteor.call('users.favoriteCustomer', userId, 'x')).should.throw(
          Error,
        );
      });

      it('throws an error if the customerId is already a favorite', () => {
        Meteor.call('users.favoriteCustomer', userId, customerId);
        (() =>
          Meteor.call(
            'users.favoriteCustomer',
            userId,
            customerId,
          )).should.throw(Error);
      });
    });

    describe('users.unfavoriteCustomer', () => {
      let userId;
      let customerId;
      beforeEach(() => {
        Customers.remove({});
        customerId = Customers.insert({});
        Meteor.users.remove({});
        userId = Meteor.users.insert({
          profile: { favoriteCustomers: [customerId] },
        });
      });

      it('removes the customerId to the favorite customers array', () => {
        Meteor.call('users.unfavoriteCustomer', userId, customerId);
        Meteor.users
          .findOne(userId)
          .profile.favoriteCustomers.length.should.equal(0);
      });

      it('throws an error if the userId is invalid', function() {
        this.timeout(10000);
        (() =>
          Meteor.call('users.favoriteCustomer', 'x', customerId)).should.throw(
          Error,
        );
      });

      it('throws an error if the customerId is invalid', () => {
        (() => Meteor.call('users.favoriteCustomer', userId, 'x')).should.throw(
          Error,
        );
      });

      it('throws an error if the customerId is not already a favorite', () => {
        Meteor.call('users.unfavoriteCustomer', userId, customerId);
        (() =>
          Meteor.call(
            'users.unfavoriteCustomer',
            userId,
            customerId,
          )).should.throw(Error);
      });
    });
  });
}
