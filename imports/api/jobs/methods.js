import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Jobs } from './jobs';
import { Customers } from '../customers/customers';

Meteor.methods({
  'jobs.new': function jobsNewMethod(options) {
    check(options, Jobs.schema);
    const query = options;
    if (query.shipper) {
      query.shipper = Customers.refSchema.clean(query.shipper);
    }
    if (query.consignee) {
      query.consignee = Customers.refSchema.clean(query.consignee);
    }
    Jobs.schema.clean(query);
    Jobs.insert(query);
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
