import { Template } from 'meteor/templating';

import './customer.html';
import './customer.less';

Template.customer.helpers({
  creditPercent() {
    return `${Math.round((this.customer.credit.used / this.customer.credit.total) * 100)}%`;
  },
});
