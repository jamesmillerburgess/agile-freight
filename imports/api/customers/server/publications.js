import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Customers } from '../customers';

Meteor.publish('customers.branchActive', function publishCustomersBranchActive() {
  if (this.userId) {
    return Customers.find({ });
  }
});
