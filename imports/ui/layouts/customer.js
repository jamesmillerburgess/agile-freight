import { Template } from 'meteor/templating';

import './customer.html';
import './customer.less';

Template.customer.helpers({
  customer() {
    return this.customer;
  },
  creditPercent() {
    return `${Math.round((this.customer.credit.used / this.customer.credit.total) * 100)}%`;
  },
  quotes() {
    return this.quotes;
  },
  jobs() {
    return this.jobs;
  },
});
