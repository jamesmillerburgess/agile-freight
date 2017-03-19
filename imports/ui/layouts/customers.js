import { Template } from 'meteor/templating';

import './customers.html';
import './customers.less';

Template.customers.helpers({
  customers() {
    return this;
  },
});
