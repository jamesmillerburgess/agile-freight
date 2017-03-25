import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Jobs } from './jobs.js';

const StakeholderRefSchema = new SimpleSchema({
  id: { type: String, optional: true, defaultValue: '' },
  name: { type: String, optional: true, defaultValue: '' },
  address: { type: String, optional: true, defaultValue: '' },
});

const JobSchema = new SimpleSchema({
  jobCode: { type: String, optional: true, defaultValue: '' },
  shipper: { type: StakeholderRefSchema, optional: true },
  consignee: { type: StakeholderRefSchema, optional: true },
  // TODO: Schemas for the below items
  incoterm: { type: String, optional: true, defaultValue: '' },
  exportOffice: { type: String, optional: true },
  importOffice: { type: String, optional: true },
  cargo: { type: Object, optional: true },
  routing: { type: Object, optional: true },
  operations: { type: Object, optional: true },
  accounting: { type: Object, optional: true },
});

Meteor.methods({
  'jobs.new': function jobsNewMethod(options) {
    check(options, JobSchema);
    JobSchema.clean(options);
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
