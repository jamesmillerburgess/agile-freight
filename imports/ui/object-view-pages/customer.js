import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';

import './customer.html';
import './customer.less';

Template.customer.helpers({
  creditPercent() {
    return `${Math.round((this.customer.credit.used / this.customer.credit.total) * 100)}%`;
  },
});

Template.customer.events({
  'click #new-job-button': function handleClickNewJobButton() {
    const newJob = {
      shipper: this.customer._id,
      updates: [
        {
          type: 'Action',
          source: Meteor.userId(),
          message: 'created the job',
        },
      ],
    };
    Meteor.call('jobs.new', newJob, (error, result) => {
      FlowRouter.go(`/job/${result}`);
    });
  },
});
