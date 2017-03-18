import { Meteor } from 'meteor/meteor';

import { Customers } from '../customers';

Meteor.publish('customers.single', customerCode => Customers.findOne({ customerCode }));
