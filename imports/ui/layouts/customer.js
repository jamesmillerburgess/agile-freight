import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Customers } from '../../api/customers/customers';
import { listRenderHold } from '../launch-screen.js';

import './customer.html';
import './customer.less';

Template.customer.onCreated(function onCreated() {
  this.data.customerCode = +FlowRouter.getParam('customerCode');
  this.autorun(() => {
    const customerCode = `${this.data.customerCode}`;
    this.subscribe('customers.single', { customerCode });
  });
});

Template.customer.onRendered(function onRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      listRenderHold.release();
    }
  });
});

Template.customer.helpers({
  customer() {
    return Customers.findOne({ code: this.customerCode });
  },
  creditPercent() {
    const customer = Customers.findOne({ code: this.customerCode });
    if (customer && customer.credit && customer.credit.used && customer.credit.total) {
      return `${Math.round((customer.credit.used / customer.credit.total) * 100)}%`;
    }
    return null;
  },
});
