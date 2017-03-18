import { Template } from 'meteor/templating';

import { Customers } from '../../api/customers/customers';

import './customers.html';
import './customers.less';

Template.customers.helpers({
  customers() {
    return Customers.find();
  },
});
