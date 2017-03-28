import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import moment from 'moment';

import { UIGlobals } from '../../ui/ui-globals';
import { Jobs } from './jobs';

Meteor.methods({
  'jobs.new': function jobsNewMethod(options) {
    // Check the parameters
    check(options, Object);

    // Insert the new job
    return Jobs.insert(options);
  },
  'jobs.updateField': function jobsUpdateFieldMethod(jobId, path, value) {
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

    // Find the event
    let job = Jobs.findOne(query);
    let i;
    for (i = 0; i < job.events.length; i += 1) {
      if (job.events[i].id === value.id) {
        break;
      }
    }

    // Update the event (but later do the history)
    const updatePath = `events.${i}`;
    let update = {
      $set: {
        [`${updatePath}.date`]: value.date,
        [`${updatePath}.status`]: value.status,
        [`${updatePath}.remarks`]: value.remarks,
      },
    };
    Jobs.update(query, update);
    job = Jobs.findOne(query);

    // Infer job status based on events
    let newJobStatus = 'Initiated';

    function checkEvent(name) {
      return _.find(job.events, event => event.type === name && event.status === 'Actual');
    }

    if (checkEvent('Proof of Delivery')) {
      newJobStatus = 'Delivered';
    } else if (checkEvent('International Arrival')) {
      newJobStatus = 'Arrived';
    } else if (checkEvent('International Departure')) {
      newJobStatus = 'Departed';
    } else if (checkEvent('Physical Receipt of Goods')) {
      newJobStatus = 'Received';
    }

    // Add a history entry
    const historyEntry = {
      date: value.date,
      status: value.status,
      remarks: value.remarks,
      timestamp: new Date(),
      user: Meteor.userId(),
    };
    const historyPath = `${updatePath}.history`;

    // Second job update
    update = {
      $push: { [historyPath]: historyEntry },
      $set: { status: newJobStatus },
    };
    Jobs.update(query, update);

    const newUpdate = {
      type: 'note',
      source: Meteor.userId(),
      message: `updated ${value.status.toLowerCase()} ${value.type} to ${moment(value.date).format(UIGlobals.dateFormat)}`,
    };
    Meteor.call('jobs.addUpdate', jobId, newUpdate);

    // Return the job
    return Jobs.findOne(query);
  },
  'jobs.addUpdate': function jobsAddUpdateMethod(jobId, value) {
    // Check the parameters
    check(jobId, String);
    check(value, Object);

    // Build the query and update criteria
    const query = { _id: jobId };
    const update = { $push: { updates: value } };

    // Update the job
    Jobs.update(query, update);
  },
  'jobs.addUnit': function jobsAddUnitMethod(jobId) {
    // Check the parameters
    check(jobId, String);

    // Build the query and update criteria
    const query = { _id: jobId };
    const update = {
      $push: {
        'cargo.units': {
          number: 'UNIT001',
          type: '20\' DC',
        },
      },
    };

    // Update the job
    Jobs.update(query, update);
  },
});
