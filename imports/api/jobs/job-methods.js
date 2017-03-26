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

    // Build the query and update criteria
    const query = { _id: jobId };
    const update = { $set: { [path]: value } };

    // Update the job
    Jobs.update(query, update);

    return Jobs.findOne(query);

    // Update search
    // updateSearch(jobId);
  },
  'jobs.updateEvent': function jobsUpdateEventMethod(jobId, value) {
    // Check the parameters
    check(jobId, String);
    check(value, Object);

    // Build the query and update criteria
    const query = { _id: jobId };
    //

    const job = Jobs.findOne(query);
    let i;
    for (i = 0; i < job.events.length; i += 1) {
      if (job.events[i].id === value.id) {
        break;
      }
    }

    const updatePath = `events.${i}`;
    const update = {
      $set: {
        [`${updatePath}.date`]: value.date,
        [`${updatePath}.status`]: value.status,
        [`${updatePath}.remarks`]: value.remarks,
      },
    };
    Jobs.update(query, update);

    const historyEntry = {
      date: value.date,
      status: value.status,
      remarks: value.remarks,
      timestamp: new Date(),
      user: Meteor.userId(),
    };
    const historyPath = `${updatePath}.history`;
    Jobs.update(query, { $push: { [historyPath]: historyEntry } });

    return Jobs.findOne(query);
  },
});
