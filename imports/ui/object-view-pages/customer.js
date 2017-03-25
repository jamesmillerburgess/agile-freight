import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Customers } from '../../api/customers/customers';

import './customer.html';
import './customer.less';

Template.customer.helpers({
  creditPercent() {
    return `${Math.round((this.customer.credit.used / this.customer.credit.total) * 100)}%`;
  },
});

Template.customer.events({
  'click #new-job-button': function handleClickNewJobButton(event) {
    Meteor.call('jobs.new', {
      shipperId: Customers.findOne({ name: 'Alstom Power Boilers Limited' }, {})._id,
    });
  },
});
