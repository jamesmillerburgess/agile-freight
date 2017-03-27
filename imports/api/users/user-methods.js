import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'users.updateField': function usersUpdateField(userId, path, value) {
    // Check the parameters
    check(userId, String);
    check(path, String);
    check(value, String);

    // Build the query and update criteria
    const query = { _id: userId };
    const update = { $set: { [path]: value } };

    // Update the job
    Meteor.users.update(query, update);

    return Meteor.users.findOne(query);

    // Update search
    // updateSearch(jobId);
  },
});
