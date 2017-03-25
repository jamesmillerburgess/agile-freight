import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Jobs } from './jobs.js';

const StakeholderRefSchema = new SimpleSchema({
  _id: { type: String },
  name: { type: String },
  address: { type: String, optional: true },
});

const JobSchema = new SimpleSchema({
  jobCode: { type: String, optional: true },
  shipperId: { type: String, optional: true },
  consigneeId: { type: String, optional: true },
  // shipper: { type: StakeholderRefSchema, optional: true },
  // consignee: { type: StakeholderRefSchema, optional: true },
});

Meteor.methods({
  'jobs.new': function jobsNewMethod(options) {
    check(options, JobSchema);
    Jobs.insert(options);
  },
  'jobs.updateField': function jobsUpdateFieldMethod(jobId, path = '', field, value) {
    // Check the parameters
    check(jobId, String);
    check(field, String);
    check(value, String);

    // Build the query
    const query = { _id: jobId };

    // Build the update
    if (!path) {
      path = field;
    } else {
      path += '.' + field;
    }

    const update = { $set: { [path]: value } };

    // Update the job
    Jobs.update(query, update);

    // Update search
    // updateSearch(jobId);
  },

});
