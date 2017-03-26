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
    Meteor.call('jobs.new', { shipper: this.customer._id }, (error, result) => {
      FlowRouter.go(`/job/${result}`);
    });
  },
});
