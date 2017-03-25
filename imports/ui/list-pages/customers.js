import { Template } from 'meteor/templating';

import { Customers } from '../../api/customers/customers';
import UIGlobals from '../ui-globals';

import './customers.html';
import './customers.less';

Template.customers.helpers({
  customers() {
    return Customers.find({}, { limit: UIGlobals().listLimit });
  },
});
