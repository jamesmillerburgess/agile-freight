import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Rates } from './rates.js';


Meteor.methods({

  'rates.singleSearch': function singleSearch(fromLocation, toLocation) {
    // Check the parameters
    check(fromLocation, String);
    check(toLocation, String);

    // Build the query
    const query = { fromLocation, toLocation };

    // Search
    return Rates.find(query);
  },

  // 'jobs.updateField'(jobId, path = '', field, value) {
  //
  //   // Check the parameters
  //   check(jobId, String);
  //   check(field, String);
  //
  //   // Build the query
  //   const query = { _id: jobId };
  //
  //   // Build the update
  //   if (!path) {
  //     path = field;
  //   } else {
  //     path += '.' + field;
  //   }
  //
  //   let update = { $set: { [path]: value } };
  //
  //   // Update the job
  //   Jobs.update(query, update);
  //
  //   // Update search
  //   // updateSearch(jobId);
  // },

});
