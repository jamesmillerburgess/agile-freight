import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Customers } from '../customers/customersCollection';

Meteor.methods({
  'users.favoriteCustomer': function usersFavoriteCustomer(userId, customerId) {
    check(userId, String);
    check(customerId, String);

    const user = Meteor.users.findOne(userId);
    if (!user) {
      throw new Error(`UserId ${userId} does not exist.`);
    }

    if (!Customers.findOne(customerId)) {
      throw new Error(`CustomerId ${customerId} does not exist.`);
    }

    if (
      user.profile &&
      user.profile.favoriteCustomers &&
      user.profile.favoriteCustomers.indexOf(customerId) !== -1
    ) {
      throw new Error(`CustomerId ${customerId} is already a favorite`);
    }

    Meteor.users.update({ _id: userId },
      { $push: { 'profile.favoriteCustomers': customerId } });
  },
  'users.unfavoriteCustomer': function unfavoriteCustomer(userId, customerId) {
    check(userId, String);
    check(customerId, String);

    const user = Meteor.users.findOne(userId);
    if (!user) {
      throw new Error(`UserId ${userId} does not exist.`);
    }

    if (!Customers.findOne(customerId)) {
      throw new Error(`CustomerId ${customerId} does not exist.`);
    }

    if (
      user.profile &&
      user.profile.favoriteCustomers &&
      user.profile.favoriteCustomers.indexOf(customerId) === -1
    ) {
      throw new Error(`CustomerId ${customerId} is not a favorite.`);
    }

    Meteor.users.update({ _id: userId },
      { $pull: { 'profile.favoriteCustomers': customerId } });
  },
});
