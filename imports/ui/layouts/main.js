import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './main.html';
import './main.less';

import { Customers } from '../../api/customers/customers';
import { Quotes } from '../../api/quotes/quotes';
import { Jobs } from '../../api/jobs/jobs';

Template.main.onCreated(function onCreated() {
  this.subscribe('branch.active');
});

Template.main.helpers({
  context() {
    const routeName = FlowRouter.getRouteName();

    if (routeName === 'Customers') {
      return Customers.find();
    }

    if (routeName === 'Customer') {
      const id = FlowRouter.getParam('_id');
      return {
        customer: Customers.findOne(id),
        quotes: Quotes.find({ customerId: id }),
        jobs: Jobs.find(),
      };
    }

    if (routeName === 'Job') {
      const id = FlowRouter.getParam('_id');
      return {
        job: Jobs.findOne(id),
      };
    }
    return null;
  },
});
