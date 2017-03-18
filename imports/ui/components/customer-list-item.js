import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './customer-list-item.html';
import './customer-list-item.less';

Template.customerListItem.helpers({
  // TODO: Replace with FlowRouter.go()??
  link() {
    return `./customer/${this.customer.code}`;
  },
  customer() {
    return this.customer;
  },
  creditPercent() {
    return `${Math.round((this.customer.credit.used / this.customer.credit.total) * 100)}%`;
  },
});

Template.customerListItem.events({
  'click .card': function handleClickCard() {
    FlowRouter.go(`/customer/${this.customer.code}`);
  },
});
