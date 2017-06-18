import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Customers } from '../customers/customersCollection';

Meteor.methods({
  'users.updateField': function usersUpdateField(userId, path, value) {
    // Check the parameters
    check(userId, String);
    check(path, String);
    check(value, String);

    // Build the query and update criteria
    const query  = { _id: userId };
    const update = { $set: { [path]: value } };

    // Update the job
    Meteor.users.update(query, update);

    return Meteor.users.findOne(query);

    // Update search
    // updateSearch(jobId);
  },
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
});
