import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Jobs } from './jobs';
import { Customers } from '../customers/customers';

Meteor.methods({
  'jobs.new': function jobsNewMethod(options) {
    const query = options;
    if (query.shipper) {
      query.shipper = Customers.simpleSchema().clean(query.shipper);
    }
    if (query.consignee) {
      query.consignee = Customers.simpleSchema().clean(query.consignee);
    }
    Jobs.simpleSchema().clean(query);
    return Jobs.insert(query);
  },
  'jobs.updateField': function jobsUpdateFieldMethod(jobId, path = '', value) {

    // Check the parameters
    check(jobId, String);
    check(path, String);
    check(value, String);

    // Build the query
    const query = { _id: jobId };

    // Build the update
    // if (!path) {
    //   path = field;
    // } else {
    //   path += `.${field}`;
    // }

    const update = { $set: { [path]: value } };

    // Update the job
    Jobs.update(query, update);

    return Jobs.findOne(query);
    // Update search
    // updateSearch(jobId);
  },

});
