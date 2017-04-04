import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './job-list-item.html';
import '../../../client/css/job-list-item.less';

Template.jobListItem.events({
  'click .card': function handleClickCard() {
    FlowRouter.go(`/job/${this._id}`);
  },
});
