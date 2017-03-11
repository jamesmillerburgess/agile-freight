import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Jobs } from './jobs.js';

Meteor.methods({

  'jobs.updateField'(jobId, path = '', field, value) {

    // Check the parameters
    check(jobId, String);
    check(field, String);

    // Build the query
    const query = { _id: jobId };

    // Build the update
    if (!path) {
      path = field;
    } else {
      path += '.' + field;
    }

    let update = { $set: { [path]: value } };

    // Update the job
    Jobs.update(query, update);

    // Update search
    // updateSearch(jobId);
  },

});
