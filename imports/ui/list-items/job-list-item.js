import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './job-list-item.html';
import './job-list-item.less';

Template.jobListItem.helpers({
  job() {
    console.log(this);
    return this.job;
  },
});

Template.jobListItem.events({
  'click .card': function handleClickCard() {
    FlowRouter.go(`/job/${this.job._id}`);
  },
});
